import { GET_POST_BY_POST_ID } from 'graphql/queries';
import { useRouter } from 'next/router';
import React from 'react';
import { PostType } from 'type/type';

import { useQuery } from '@apollo/client';
import Post from '@Components/post/Post';

const PostPage = () => {
  const router = useRouter()
  const { postId } = router.query
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: { post_id: postId },
  })

  const post: PostType = data?.getPostListByPostId

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />
    </div>
  )
}

export default PostPage
