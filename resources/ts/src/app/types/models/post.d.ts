import CommentType from "./comment";
import UserType from "./user";

export default interface PostType {
    id: number;
    text: string;
    likes: number[];
    comments: CommentType[];
    created_at: Date;
    updated_at: Date;
    ago: string;
}
