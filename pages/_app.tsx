import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import Header from '@Components/header/Header';

import type { AppProps } from 'next/app'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="h-screen overflow-y-scroll bg-slate-200">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
