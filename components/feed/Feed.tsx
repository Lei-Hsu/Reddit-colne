import { GET_ALL_POSTS } from 'graphql/queries';
import React from 'react';
import { PostType } from 'type/type';

import { useQuery } from '@apollo/client';
import Post from '@Components/post/Post';

const Feed = () => {
  const { data, error } = useQuery(GET_ALL_POSTS)

  const posts: PostType[] = data?.getPostList
  return (
    <div className="mt-5 w-full space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed
