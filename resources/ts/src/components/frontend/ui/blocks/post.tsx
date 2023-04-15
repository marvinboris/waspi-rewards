import {
    ChatBubbleBottomCenterIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon,
    TrashIcon,
} from "@heroicons/react/20/solid";
import { FormEvent, useState } from "react";

import PostType from "../../../../app/types/models/post";
import UserType from "../../../../app/types/models/user";
import { classNames } from "../../../../app/helpers/utils";
import UserPic from "./user-pic";

type PostBlockProps = {
    post: PostType;
    user: UserType;
    onPostLike: (id: number) => void;
    onPostComment: (id: number, data: object) => void;
    onPostCommentLike: (post_id: number, id: number) => void;
    onPostCommentDelete: (post_id: number, id: number) => void;
};

export default function PostBlock({
    post,
    user,
    onPostLike,
    onPostComment,
    onPostCommentLike,
    onPostCommentDelete,
}: PostBlockProps) {
    const [comment, setComment] = useState("");
    const [commenting, setCommenting] = useState(false);
    const [all, setAll] = useState(false);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (comment.trim() !== "") onPostComment(post.id, e.target);
        setComment("");
    };

    const comments = post.comments
        .filter((c, i) => i < (all ? post.comments.length : 2))
        .map((comment) => (
            <div
                key={"comment-" + comment.id}
                className="flex items-start gap-2"
            >
                <UserPic user={comment.user} />

                <div className="flex-1">
                    <div className="rounded-r-2xl rounded-bl-2xl bg-secondary-50 p-4 text-sm">
                        <div className="flex items-center">
                            <div>
                                <h3 className="font-medium">
                                    {comment.user.name}
                                </h3>

                                {comment.user.badge ? (
                                    <div className="mt-0.5 text-xs/none capitalize">
                                        {comment.user.badge}
                                    </div>
                                ) : null}
                            </div>

                            <div className="ml-auto text-xs">{comment.ago}</div>

                            {comment.user_id !== user.id ? null : (
                                <div className="ml-1">
                                    <TrashIcon
                                        onClick={() =>
                                            onPostCommentDelete(
                                                post.id,
                                                comment.id
                                            )
                                        }
                                        className="w-3 cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>

                        <p className="mt-2">{comment.text}</p>
                    </div>

                    <div className="flex items-center gap-1 p-1">
                        <div>
                            <span
                                onClick={() =>
                                    onPostCommentLike(post.id, comment.id)
                                }
                                className={classNames(
                                    "bg-transparent cursor-pointer font-medium text-sm/none py-px px-1.5 hover:bg-secondary-100 rounded-2xl",
                                    comment.likes.includes(user.id)
                                        ? "text-blue"
                                        : "text-secondary-500"
                                )}
                            >
                                Like
                            </span>
                        </div>

                        <div className="flex items-center text-sm/none">
                            <HandThumbUpIcon className="w-4 p-[3px] inline-block text-white bg-primary rounded-full" />
                            <span className="ml-1">{comment.likes.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="bg-white rounded-2xl shadow divide-y">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium text-lg">Post #{post.id}</h2>

                    <div className="text-xs">{post.ago}</div>
                </div>

                <p className="text-sm mt-2">{post.text}</p>
            </div>

            <div className="px-4 divide-y">
                <div className="flex items-center justify-between py-2 text-xs/none">
                    <div className="flex items-center">
                        <HandThumbUpIcon className="w-4 p-[3px] inline-block text-white bg-primary rounded-full" />
                        <span className="ml-1">{post.likes.length}</span>
                    </div>

                    <div>{post.comments.length} comments</div>
                </div>

                <div className="py-2 flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => onPostLike(post.id)}
                            className={classNames(
                                "rounded-2xl flex gap-1 items-center justify-center text-sm/none font-medium bg-transparent hover:bg-secondary-100 py-4 transition-all duration-200",
                                post.likes.includes(user.id) ? "text-blue" : ""
                            )}
                        >
                            <HandThumbUpIcon className="w-3.5" />
                            Like
                        </button>

                        <label htmlFor={"comment-" + post.id}>
                            <button
                                onClick={() => setCommenting(true)}
                                className="rounded-2xl flex w-full gap-1 items-center justify-center text-sm/none font-medium bg-transparent hover:bg-secondary-100 py-4 transition-all duration-200"
                            >
                                <ChatBubbleBottomCenterIcon className="w-3.5" />
                                Comment
                            </button>
                        </label>
                    </div>

                    {commenting ? (
                        <form
                            onSubmit={onSubmit}
                            className="flex gap-2 items-start"
                        >
                            <UserPic user={user} />

                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="text"
                                    value={comment}
                                    id={"comment-" + post.id}
                                    className="rounded-2xl h-8 w-full outline-none border py-1 px-3 text-xs"
                                    placeholder="Add comment..."
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>

                            {comment === "" ? null : (
                                <button
                                    className={classNames(
                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                        comment.trim() === ""
                                            ? "text-secondary-500 bg-secondary-100"
                                            : "text-white bg-blue"
                                    )}
                                >
                                    <PaperAirplaneIcon className="w-4 flex-none" />
                                </button>
                            )}
                        </form>
                    ) : null}

                    <div className="flex flex-col gap-2 py-2">{comments}</div>

                    <div>
                        <span
                            onClick={() => setAll((a) => !a)}
                            className="bg-transparent cursor-pointer text-secondary-500 font-semibold text-sm/none py-1 px-2 hover:bg-secondary-100 rounded-2xl"
                        >
                            {all ? "Less" : "More"} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
