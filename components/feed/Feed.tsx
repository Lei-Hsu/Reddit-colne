import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from 'graphql/queries';
import React, { useEffect } from 'react';
import { PostType } from 'type/type';

import { useQuery } from '@apollo/client';
import Post from '@Components/post/Post';
import { Jelly } from '@uiball/loaders';

interface FeedProps {
  topic?: string
}

const Feed = ({ topic }: FeedProps) => {
  const { data, error } = topic
    ? useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: { topic },
      })
    : useQuery(GET_ALL_POSTS)

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])

  const posts: PostType[] = topic ? data?.getPostListByTopic : data?.getPostList

  if (!posts)
    return (
      <div className="mt-10 flex w-full items-center justify-center">
        <Jelly size={80} color="#ff4501" />
      </div>
    )
  return (
    <div className="mt-5 w-full space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default React.memo(Feed)
