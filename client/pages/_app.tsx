import '../styles/globals.css';
import { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import { SessionProvider } from "next-auth/react"

// const variants = {
//   hidden: { opacity: 0, x: 0, y: 0 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 0, x: 0, y: 0 },
// }
// const transition = {
//   times: [0, 0.1, 0.9, 1]
// }
// <motion.div key={router.route} initial="hidden" animate="enter" exit="exit" transition={transition}  variants={variants} >


function App({ 
  Component, 
  router ,
  pageProps: { session, initialApolloState, ...pageProps }, 
}: AppProps) {
  const apolloClient = useApollo(initialApolloState)

  return (
    <SessionProvider session={session} refetchInterval={540} refetchOnWindowFocus={false}>
      <ApolloProvider client={apolloClient}>  
        <Component {...pageProps}/>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default App
