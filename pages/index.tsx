import type { NextPage } from 'next'
import { GET_SUBREDDIT_WITH_LIMIT } from 'graphql/queries';
import Head from 'next/head';
import Image from 'next/image';
import { SubredditType } from 'type/type';

import { useQuery } from '@apollo/client';
import Feed from '@Components/feed/Feed';
import Header from '@Components/header/Header';
import PostBox from '@Components/postBox/PostBox';
import SubReddit from '@Components/subReddit/SubReddit';

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: { limit: 10 },
  })
  const subreddit: SubredditType[] = data?.getSubRedditListByLimit
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />

      <div className="flex">
        <Feed />
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>
            {subreddit?.map((item, index) => (
              <SubReddit key={item.id} topic={item.topic} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
