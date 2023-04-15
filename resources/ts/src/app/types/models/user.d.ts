import BadgeType from "../enums/badge-type"
import CommentType from "./comment"

export default interface UserType {
    id: number
    name: string
    email: string
    points: number
    badge?: BadgeType
    next_badge?: BadgeType
    comments: CommentType[]
    comment_likes: number[]
    post_likes: number[]
}