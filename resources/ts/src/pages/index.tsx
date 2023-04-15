import { UserIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";

import CommentType from "../app/types/models/comment";
import PostType from "../app/types/models/post";
import UserType from "../app/types/models/user";

import PostBlock from "../components/frontend/ui/blocks/post";
import UserPic from "../components/frontend/ui/blocks/user-pic";

type HomeDataType = {
    account?: UserType;
    posts: PostType[];
    comments: CommentType[];
};

type UpdatedDataType = {
    account: UserType;
    post: PostType;
    comments: CommentType[];
};

const HomePage = () => {
    const [home, setHome] = useState<HomeDataType>({
        posts: [],
        comments: [],
    });

    useEffect(() => {
        axios.get<HomeDataType>(`/api/posts`).then((res) => setHome(res.data));
    }, []);

    const onPostLike = (id: number) => {
        setHome((home) => {
            const account = home.account!;
            const posts = home.posts;

            const postIndex = posts.findIndex((p) => p.id === id);
            if (account.post_likes.includes(id)) {
                account.post_likes = account.post_likes.filter((l) => l !== id);
                posts[postIndex].likes = posts[postIndex].likes.filter(
                    (l) => l !== account.id
                );
            } else {
                account.post_likes = account.post_likes.concat(id);
                posts[postIndex].likes = posts[postIndex].likes.concat(
                    account.id
                );
            }

            return { ...home, account, posts };
        });
        axios.post<UpdatedDataType>(`/api/posts/${id}/likes`).then((res) =>
            setHome((home) => {
                const { account, post } = res.data;
                const posts = home.posts;
                const postIndex = posts.findIndex((post) => post.id === id);
                posts[postIndex] = post;
                return { ...home, account, posts };
            })
        );
    };

    const onPostComment = (id: number, data: object) => {
        axios
            .post<UpdatedDataType>(`/api/posts/${id}/comments`, data)
            .then((res) =>
                setHome((home) => {
                    const { account, post, comments } = res.data;
                    const posts = home.posts;
                    const postIndex = posts.findIndex((post) => post.id === id);
                    posts[postIndex] = post;
                    return { ...home, account, posts, comments };
                })
            );
    };

    const onPostCommentLike = (post_id: number, id: number) => {
        setHome((home) => {
            const account = home.account!;
            const posts = home.posts;

            const postIndex = posts.findIndex((p) => p.id === post_id);
            const commentIndex = posts[postIndex].comments.findIndex(
                (c) => c.id === id
            );

            if (account.comment_likes.includes(id)) {
                account.comment_likes = account.comment_likes.filter(
                    (l) => l !== id
                );
                posts[postIndex].comments[commentIndex].likes = posts[
                    postIndex
                ].comments[commentIndex].likes.filter((l) => l !== account.id);
            } else {
                account.comment_likes = account.comment_likes.concat(id);
                posts[postIndex].comments[commentIndex].likes = posts[
                    postIndex
                ].comments[commentIndex].likes.concat(account.id);
            }

            return { ...home, account, posts };
        });
        axios
            .post<UpdatedDataType>(`/api/posts/${post_id}/comments/${id}/likes`)
            .then((res) =>
                setHome((home) => {
                    const { account, post, comments } = res.data;
                    const posts = home.posts;
                    const postIndex = posts.findIndex(
                        (post) => post.id === post_id
                    );
                    posts[postIndex] = post;
                    return { ...home, account, posts, comments };
                })
            );
    };

    const onPostCommentDelete = (post_id: number, id: number) => {
        setHome((home) => {
            const account = home.account!;
            const posts = home.posts;

            const postIndex = posts.findIndex((p) => p.id === post_id);
            const commentIndex = posts[postIndex].comments.findIndex(
                (c) => c.id === id
            );

            account.comments = account.comments.filter((c) => c.id !== id);
            posts[postIndex].comments = posts[postIndex].comments.filter(
                (c) => c.id !== commentIndex
            );

            return { ...home, account, posts };
        });
        axios
            .delete<UpdatedDataType>(`/api/posts/${post_id}/comments/${id}`)
            .then((res) =>
                setHome((home) => {
                    const { account, post, comments } = res.data;
                    const posts = home.posts;
                    const postIndex = posts.findIndex(
                        (post) => post.id === post_id
                    );
                    posts[postIndex] = post;
                    return { ...home, account, posts, comments };
                })
            );
    };

    const posts = home.posts.map((post) => (
        <PostBlock
            key={"post-" + post.id}
            post={post}
            user={home.account!}
            onPostLike={onPostLike}
            onPostComment={onPostComment}
            onPostCommentLike={onPostCommentLike}
            onPostCommentDelete={onPostCommentDelete}
        />
    ));

    const comments = home.comments.map((comment) => (
        <div
            key={"recent-comment-" + comment.id}
            className="flex items-start gap-2"
        >
            <UserPic user={comment.user} size="xl" />

            <div className="flex-1">
                <div className="text-sm">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">{comment.user.name}</h3>
                    </div>

                    <p className="line-clamp-3">{comment.text}</p>
                </div>
            </div>
        </div>
    ));

    return home.account ? (
        <main className="sticky top-0">
            <div className="container grid md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 sticky top-0">
                <div className="md:sticky top-0">
                    <article className="bg-white rounded-2xl divide-y shadow sticky top-[75px]">
                        <div className="text-center flex flex-col items-center p-4 gap-2">
                            <UserPic user={home.account!} size="2xl" />

                            <div className="text-xl/none font-semibold">
                                {home.account.name}
                            </div>

                            <div className="text-xs/none text-primary capitalize font-medium">
                                {home.account.badge || 'N/A'}
                            </div>
                        </div>

                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex justify-between text-xs/none">
                                <span className="font-medium">Points</span>
                                <span className="text-primary font-semibold">
                                    {home.account.points}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs/none">
                                <span className="font-medium">Likes</span>
                                <span className="text-primary font-semibold">
                                    {home.account.comment_likes.length +
                                        home.account.post_likes.length}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs/none">
                                <span className="font-medium">Comments</span>
                                <span className="text-primary font-semibold">
                                    {home.account.comments.length}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs/none">
                                <span className="font-medium">Next Badge</span>
                                <span className="text-primary font-semibold capitalize">
                                    {home.account.next_badge || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </article>
                </div>

                <div className="md:col-span-2 flex flex-col gap-4">{posts}</div>

                <div className="sticky top-0 hidden lg:block">
                    <article className="bg-white rounded-2xl shadow p-4 gap-2 flex flex-col sticky top-[75px]">
                        <h2 className="font-medium">Recent comments</h2>

                        {comments}
                    </article>
                </div>
            </div>
        </main>
    ) : (
        <div className="h-[calc(100vh-242px)] z-[100] flex items-center justify-center">
            <div className="h-32 w-32 rounded-full border-8 border-primary/50 border-t-8 border-t-primary animate-spin" />
        </div>
    );
};

export default HomePage;
