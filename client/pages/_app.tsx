import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { motion } from "framer-motion"
import { AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
const variants = {
  hidden: { opacity: 0.2, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0.2, x: 0, y: -200 },
}

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <div className="bg-slate-200">
      <div className="grid w-screen p-2">
          <div className="place-self-center">
            <Navbar />
          </div>
      </div>

      <motion.div key={router.route} initial="hidden" animate="enter" exit="exit" transition={{ times: [0, 0.1, 0.9, 1] }}  variants={variants} >
        <Component {...pageProps} />
      </motion.div>
    </div>
  ) 
}

export default MyApp
