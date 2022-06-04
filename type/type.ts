export interface CommentsType {
  created_at: string
  id: number
  post_id: number
  text: string
  username: string
}

export interface VoteType {
  created_at: string
  id: number
  post_id: number
  upvote: boolean
  username: string
}

export interface SubredditType {
  created_at: string
  id: number
  topic: string
}

export interface PostType {
  body: string
  created_at: string
  id: number
  image: string
  subreddit_id: number
  title: string
  username: string
  votes: VoteType[]
  comment: CommentsType[]
  subreddit: SubredditType[]
}