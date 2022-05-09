import type { NextPage } from 'next'
import Head from 'next/head'
import Avatar from '../components/Avatar';
import Navbar from '../components/Navbar';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';

const Characters: NextPage = () => {
    return (
        <div className="bg-slate-200 w-screen h-screen">
            <Head>
                <title>AniArena</title>
            </Head>
            <main className="">
                {/* navbar */}
                <Navbar />
                
                {/* sections */}
                <div className="flex items-center justify-center m-4 gap-8">
                    <div className="grid justify-items-center my-50 border-2 p-4 gap-4">
                        <RectCard imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                        <div className="w-64">
                            <WordBallon text="其名惠惠，職業乃大法師，使役最強之攻擊魔法：爆裂魔法之人！" />
                        </div>
                    </div>
                    <div className="items-center justify-center mx-100 my-4 border-2 p-2 gap-2 bg-white rounded-lg">
                        {/* middle section */}
                        {/*Todo: change it to filter map  */}
                        <Avatar imgsrc="https://images-ext-1.discordapp.net/external/x08twzHAcDIWcqHEPgEIdfLNoIGST3tHUdti0Ww3b00/https/mudae.net/uploads/1232276/v6uL2AsAjYy0QE0-4OKy~0P98O5C.png" />
                        <Avatar imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png" />
                        <Avatar imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045678669484062/nkmBV7R.png" />
                    </div>
                    <div className="space-y-4">
                        <WordBallon text="Section 2" />
                    </div>
                </div>

            </main>
        </div>
  )
}

export default Characters
