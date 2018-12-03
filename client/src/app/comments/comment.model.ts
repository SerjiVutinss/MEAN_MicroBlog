export interface Comment {
    _id?: String,
    user_id: String,
    post_id: String,
    username?: String,
    content: String,
    created_utc: any,
    updated_utc?: any
}