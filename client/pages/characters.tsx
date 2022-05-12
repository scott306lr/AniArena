import type { NextPage } from 'next'
import Head from 'next/head'
import ActionButton from '../components/ActionButton';
import AttributeBar from '../components/AttributeBar';
import Avatar from '../components/Avatar';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';
import React from 'react'
import SkillCard from '../components/SkillCard';
import AttributeAdjustor from '../components/AttributeAdjustor';

const variants = {
    hidden: { opacity: 0.2, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0.2, x: 0, y: -200 },
  }

const Characters: NextPage = () => {
    const [expMax, setExpMax] = React.useState(4);
    const [expVal, setExpVal] = React.useState(1);
    const increaseExp = () => setExpVal((prev) => Math.min(expMax, expVal+1));
    const decreaseExp = () => setExpVal((prev) => Math.max(0, expVal-1));

    const [hp, setHp] = React.useState(7);
    const addHp = () => setHp(hp + 1);
    const minusHp = () => setHp(Math.max(0, hp -1));

    const confirmClick = () => {console.log("confirm clicked")};
    const resetClick = () => {console.log("reset clicked")};
    // Todo: fetch data here

    return (
        <div className="">
            <Head>
                <title>AniArena</title>
            </Head>
            <main className="grid">


                
                {/* sections */}
                <div className="flex flex-wrap justify-center m-8 p-4 gap-8">
                    <div className="grid place-content-center p-2">
                        {/* middle characters section*/}
                        {/*Todo: change it to filter map  */}
                        {/*      Add click event */}
                        <div className="md:grid flex flex-wrap bg-white rounded-lg shadow-lg p-2 space-y-2 hover:scale-110 transition-all">
                            <Avatar imgsrc="https://images-ext-1.discordapp.net/external/x08twzHAcDIWcqHEPgEIdfLNoIGST3tHUdti0Ww3b00/https/mudae.net/uploads/1232276/v6uL2AsAjYy0QE0-4OKy~0P98O5C.png" />
                            <Avatar imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png" />
                            <Avatar imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045678669484062/nkmBV7R.png" />
                        </div>
                    </div>

                    <div className="grid place-content-center">
                        {/* Character status section */}
                        <div className="grid w-min justify-items-center gap-4">
                            <RectCard imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                            <WordBallon text="其名惠惠，職業乃大法師，使役最強之攻擊魔法：爆裂魔法之人！" />
                            <AttributeBar attribute="EXP" max={expMax} val={expVal}/>
                            <ActionButton onClick={increaseExp} text="addExp" />
                            <ActionButton onClick={decreaseExp} text="minusExp" />
                        </div>
                    </div>

                    {/* Attribute Secion */}
                    <div className="grid place-content-center">
                        <div className="grid gap-4">
                            <AttributeAdjustor name="HP" value={hp} minusClick={minusHp} addClick={addHp}/>
                            <AttributeAdjustor name="HP" value={hp} minusClick={minusHp} addClick={addHp}/>
                            <AttributeAdjustor name="HP" value={hp} minusClick={minusHp} addClick={addHp}/>
                            <ActionButton text="重設" onClick={confirmClick}/>
                            <ActionButton text="確認" onClick={resetClick}/>
                        </div>
                    </div>

                    <div className="grid lg:w-1/3 place-content-center">
                        {/* SkillCards Section */}
                        {/*Todo: change it to filter map  */}
                        <div className="grid gap-4">
                            <SkillCard name="Explosion" type="攻擊" description="黑より黑く 闇より暗き漆黑に ，無謬の境界に落ちし理，無行の歪みとなりて，現出せよ！Explosion！" imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                            <SkillCard name="Explosion" type="防禦" description="防禦魔法！" imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                            <SkillCard name="Explosion" type="攻擊" description="黑より黑く 闇より暗き漆黑に ，無謬の境界に落ちし理，無行の歪みとなりて，現出せよ！Explosion！" imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                        </div>
                    </div>

                </div>

            </main>
        </div>
  )
}

export default Characters
