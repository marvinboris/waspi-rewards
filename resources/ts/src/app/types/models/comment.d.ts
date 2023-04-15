import PostType from "./post";
import UserType from "./user";

export default interface CommentType {
    id: number;
    user_id: number;
    post_id: number;
    user: UserType;
    post: PostType;
    likes: number[];
    text: string;
    created_at: Date;
    updated_at: Date;
    ago: string;
}
