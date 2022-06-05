import Link from 'next/link';
import React from 'react';
import TimeAgo from 'react-timeago';
import { PostType } from 'type/type';

import Avatar from '@Components/avatar/Avatar';
import {
    BookmarkIcon, ChatAltIcon, DotsHorizontalIcon, GiftIcon, ShareIcon
} from '@heroicons/react/outline';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';

interface PostProps {
  post: PostType
}

const Post = ({ post }: PostProps) => {
  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-2 hover:border-gray-600">
        {/* Votes */}
        <div className="flex flex-col items-center space-y-1 bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon className="voteButtons hover:text-red-400" />
          <p className="text-xs font-bold text-black">0</p>
          <ArrowDownIcon className="voteButtons hover:text-blue-400" />
        </div>

        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="space-x-2 text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0].topic}`}>
                <span className="mr-2 font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>
              Posted by u/{post.username}
              <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/* Body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold text-black">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          {/* Image */}
          <img className="w-full" src={post.image} alt="" />
          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="h-6 w-6" />
              <p>{post.comment?.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
