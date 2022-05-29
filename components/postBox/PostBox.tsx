import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()
  const [openImageBox, setOpenImageBox] = useState<boolean>(false)

  const handleOnSubmit = handleSubmit(async (formData) => {
    console.log(formData)
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
