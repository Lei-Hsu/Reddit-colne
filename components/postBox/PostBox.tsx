import client from 'apollo-client';
import { ADD_POST, ADD_SUBREDDIT } from 'graphql/mutations';
import { GET_SUBREDDIT_BY_TOPIC } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useMutation } from '@apollo/client';
import Avatar from '@Components/avatar/Avatar';
import { LinkIcon, PhotographIcon } from '@heroicons/react/solid';

interface FormData {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

const PostBox = () => {
  const { data: session } = useSession()
  const [addPost] = useMutation(ADD_POST)
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const [openImageBox, setOpenImageBox] = useState<boolean>(false)

  const handleOnSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Creating a new post...')
    try {
      const response = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      })
      const { getSubredditListByTopic } = response.data

      const subredditExists = !!getSubredditListByTopic.length

      if (!subredditExists) {
        // 如果沒有 subreddit 先創建一個
        const insertSubRedditRes = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })
        const { insertSubReddit } = insertSubRedditRes.data

        const image = formData.postImage || ''

        const postRes = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: insertSubReddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
        const { insertPost } = postRes.data
      } else {
        // 如果有 subReddit 就直接拿確認回來的 id 新增文章
        const image = formData.postImage || ''
        const postRes = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })
        const { insertPost } = postRes.data
        console.log(insertPost)
      }

      // reset the form
      setValue('postBody', '')
      setValue('postTitle', '')
      setValue('postImage', '')
      setValue('subreddit', '')
      toast.success('New Post Created!', { id: notification })
    } catch (error) {
      toast.error('Something when wrong!', { id: notification })
    }
  })

  return (
    <form
      onSubmit={handleOnSubmit}
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session
              ? 'Create a post by entering title!'
              : 'You need to login to post'
          }
        />
        <PhotographIcon
          className={`h-6 cursor-pointer text-gray-300 ${
            openImageBox && 'text-blue-300'
          }`}
          onClick={() => setOpenImageBox(!openImageBox)}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              {...register('postBody')}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              placeholder="Text (optional)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              {...register('subreddit', { required: true })}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              placeholder="i.e. React.js"
            />
          </div>
          {openImageBox && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                {...register('postImage')}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                placeholder="Optional..."
              />
            </div>
          )}
          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="pl-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>A post title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>A post title is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}

export default React.memo(PostBox)
