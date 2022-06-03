import { gql } from '@apollo/client';

// 最上面 $開頭的像是 params , 中間像是 body , 最後面則是可以選擇 response 的 欄位
export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
  ){
    insertPost(
      body:$body
      image:$image
      subreddit_id:$subreddit_id
      title:$title
      username:$username
    ){
      body
      created_at
      id
      image
      subreddit_id
      title
      username
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic:String!){
    insertSubReddit(topic:$topic){
      id
      topic
      created_at
    }
  }
`