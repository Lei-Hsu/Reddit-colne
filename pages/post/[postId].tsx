import { ADD_COMMENT } from 'graphql/mutations';
import { GET_POST_BY_POST_ID } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import TimeAgo from 'react-timeago';
import { PostType } from 'type/type';

import { useMutation, useQuery } from '@apollo/client';
import Avatar from '@Components/avatar/Avatar';
import Post from '@Components/post/Post';

interface FormDataType {
  comment: string
}

const PostPage = () => {
  const router = useRouter()
  const { postId } = router.query
  const { data: session } = useSession()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>()
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
  })

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: { post_id: postId },
  })
  const post: PostType = data?.getPostListByPostId
  const postLoaded = !!post

  const handleOnSubmit: SubmitHandler<FormDataType> = async (data) => {
    const notification = toast.loading('Posting your comment...')

    await addComment({
      variables: {
        post_id: postId,
        username: session?.user?.name,
        text: data.comment,
      },
    })

    setValue('comment', '')

    toast.success('Comment Successfully Posted!', { id: notification })
  }

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      {postLoaded && (
        <>
          <div className="-mt-5 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
            <p className="text-sm">
              Comment as{' '}
              <span className="text-red-500">{session?.user?.name}</span>
            </p>

            <form
              className="flex flex-col space-y-2"
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <textarea
                {...register('comment')}
                disabled={!session}
                className="h-25 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                placeholder={`${
                  session
                    ? 'What is your thoughts?'
                    : 'Please sign in to comment'
                }`}
              />
              <button
                type="submit"
                disabled={!session}
                className="rounded-full bg-red-500 p-3 font-semibold text-white hover:bg-red-400 disabled:bg-gray-200"
              >
                Comment
              </button>
            </form>
          </div>

          {/* Comments */}
          <div className="border-gary-300 -my-5 rounded-md border border-t-0 bg-white py-5 px-10">
            <hr />
            {post?.comment?.map((comment) => (
              <div
                key={comment.id}
                className="relative flex items-center space-x-2 space-y-5"
              >
                <hr className="absolute top-10 left-7 z-0 h-16 border" />
                <div>
                  <Avatar seed={comment.username} />
                </div>
                <div className="flex flex-col">
                  <p className="py-2 text-xs text-gray-400">
                    <span className="mr-3 font-semibold text-gray-600">
                      {comment.username}
                    </span>
                    <TimeAgo date={comment.created_at} />
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PostPage
