import type { NextPage } from 'next'
import Head from 'next/head'
import ActionButton from '../components/ActionButton';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';
import SearchBar from '../components/SearchBar';
import PlayerCard from '../components/PlayerCard';

const PlayerList: NextPage = () => {
  const handleSearch = () => {console.log("search click")};

  return (
    <div className="bg-slate-200 w-screen h-screen">
      <Head>
        <title>AniArena</title>
      </Head>

      <main className="bg-slate-200">
        
        {/* sections */}
        <div className="flex flex-wrap items-center justify-center m-4 p-4 gap-8">
          {/* section 2 */}
          <div className="grid gap-4 lg:w-1/4 w-5/6">
              <SearchBar onClick={handleSearch}/>
              <PlayerCard name="admin" text="hello world fadsfasdfasdfasdfasdfasdfasdfasd" imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
              <PlayerCard name="admin" text="hello world" imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
              <PlayerCard name="admin" text="hello world" imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>

          </div>
          <div className="grid items-center gap-4">
            <RectCard imgsrc="https://images-ext-1.discordapp.net/external/x08twzHAcDIWcqHEPgEIdfLNoIGST3tHUdti0Ww3b00/https/mudae.net/uploads/1232276/v6uL2AsAjYy0QE0-4OKy~0P98O5C.png" />
            <ActionButton text="發起決鬥" />
          </div>
          {/* section 3 */}
          <div className="space-y-4">
            <WordBallon text="ID: i an characters" />
            <WordBallon text="Name: Admin" />
          </div>
        </div>

      </main>
    </div>
  )
}

export default PlayerList
