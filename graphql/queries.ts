import { gql } from '@apollo/client';

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic:String!){
    getSubredditListByTopic(topic:$topic){
      id
      topic
      created_at
    }
  }
`

export const GET_ALL_POSTS = gql`
  query MyQuery{
    getPostList{
      body
      title
      id
      username
      created_at
      subreddit_id
      image
      comment{ 
        created_at
        id
        post_id
        text
        username
      }
      subreddit{
        created_at
        id
        topic
      }
      votes{
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`