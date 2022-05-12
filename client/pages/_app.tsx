import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { motion } from "framer-motion"
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

const transition = {
  times: [0, 0.1, 0.9, 1]
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className="grid">
      <div className="place-self-center p-4">
        <Navbar />
      </div>
      <motion.div key={router.route} initial="hidden" animate="enter" exit="exit" transition={transition}  variants={variants} >
        <Component {...pageProps}/>
      </motion.div>
    </div>
  ) 
}

export default MyApp
