import { ADD_VOTE } from 'graphql/mutations';
import { GET_ALL_VOTES_BY_POST_ID } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TimeAgo from 'react-timeago';
import { PostType, VoteType } from 'type/type';

import { useMutation, useQuery } from '@apollo/client';
import Avatar from '@Components/avatar/Avatar';
import {
    BookmarkIcon, ChatAltIcon, DotsHorizontalIcon, GiftIcon, ShareIcon
} from '@heroicons/react/outline';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
import { Jelly } from '@uiball/loaders';

interface PostProps {
  post: PostType
}

const Post = ({ post }: PostProps) => {
  const { data: session } = useSession()
  const [vote, setVote] = useState<boolean>()

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: { post_id: post?.id },
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId'],
  })

  useEffect(() => {
    const votes: VoteType[] = data?.getVotesByPostId

    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote

    setVote(vote)
  }, [data])

  const handleUpVote = async (isUpVote: boolean) => {
    if (!session) {
      toast('You will need to sign in to Vote!')
      return
    }

    const hasVoteAndClickUpVote = vote && isUpVote
    const notVoteAndClickDownVote = vote === false && !isUpVote
    if (hasVoteAndClickUpVote || notVoteAndClickDownVote) return

    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpVote,
      },
    })
  }

  const displayVote = (data: any) => {
    const votes: VoteType[] = data?.getVotesByPostId
    let voteNum = 0
    votes?.forEach((vote) => {
      if (vote.upvote) voteNum++
      else voteNum--
    })

    if (votes?.length === 0) return 0
    if (voteNum === 0 && votes) {
      return votes[0]?.upvote ? 1 : -1
    }

    return voteNum
  }

  // loading state
  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-lg">
        <Jelly size={50} color="#ff4501" />
      </div>
    )

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-2 hover:border-gray-600">
        {/* Votes */}
        <div className="flex flex-col items-center space-y-1 bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => handleUpVote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote && 'text-red-400'
            }`}
          />
          <p className="text-xs font-bold text-black">{displayVote(data)}</p>
          <ArrowDownIcon
            onClick={() => handleUpVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote === false && 'text-blue-400'
            }`}
          />
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

export default React.memo(Post)
