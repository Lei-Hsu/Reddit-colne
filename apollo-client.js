import { ApolloClient, InMemoryCache, } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://barreirodojaiba.stepzen.net/api/filled-jellyfish/__graphql',
  headers: {
    Authentication: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
  },
  cache: new InMemoryCache()
});

export default client