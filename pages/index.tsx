import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';

import Feed from '@Components/feed/Feed';
import Header from '@Components/header/Header';
import PostBox from '@Components/postBox/PostBox';

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />

      <div className="flex">
        <Feed />
      </div>
    </div>
  )
}

export default Home
