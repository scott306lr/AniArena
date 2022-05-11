import type { NextPage } from 'next'
import Head from 'next/head'
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';

const Home: NextPage = () => {
  return (
    <div className="bg-slate-200 w-screen h-screen">
      <Head>
        <title>AniArena</title>
      </Head>

      <main className="grid">
        {/* sections */}
        <div className="flex items-center justify-center m-4 gap-8">
          {/* section 2 */}
          <div>
            <RectCard imgsrc="https://images-ext-1.discordapp.net/external/x08twzHAcDIWcqHEPgEIdfLNoIGST3tHUdti0Ww3b00/https/mudae.net/uploads/1232276/v6uL2AsAjYy0QE0-4OKy~0P98O5C.png" />
          </div>
          {/* section 3 */}
          <div className="space-y-4">
            <WordBallon text="ID: Admin" />
            <WordBallon text="Name: Admin" />
          </div>
        </div>

      </main>
    </div>
  )
}

export default Home
