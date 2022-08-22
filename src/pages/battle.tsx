import type { NextPage } from 'next'
import AttributeBar from '../components/AttributeBar';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';
import React from 'react'
import Navbar from '../components/Navbar';

const Battle: NextPage = () => {
    const [hpMax, setHpMax] = React.useState(15);
    const [hpVal, setHpVal] = React.useState(10);
    const increaseHp = () => setHpVal(Math.min(hpMax, hpVal+1));
    const decreaseHp = () => setHpVal(Math.max(0, hpVal-1));

    const [hp, setHp] = React.useState(7);
    // Todo: fetch data here

    return (
        <div>
            <Navbar />
            <main className="grid">
                {/* sections */}
                <div className="flex flex-wrap justify-center m-8 p-4 gap-4">
                    {/* Character A status section */}
                    <div>
                        <div className="grid w-min justify-items-center gap-4">
                            <RectCard imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                            <WordBallon text="其名惠惠，職業乃大法師，使役最強之攻擊魔法：爆裂魔法之人！" />
                            <AttributeBar attribute="HP" max={hpMax} val={hpVal}/>
                        </div>
                    </div>

                    <div className="flex sm:w-1/3">
                        <ul className="grid gap-4 h-fit p-2">
                            <li className="flex justify-start w-full pr-6">
                                <WordBallon text="黑より黑く 闇より暗き漆黑に ，我が深紅の混淆を望みたもう，覺醒のとき來たれり，無謬の境界に落ちし理，無行の歪みとなりて，現出せよ！Explosion！"/>
                            </li>
                            <li className="flex justify-end w-full pl-6">
                                <WordBallon text="亞絲娜！克萊茵！拜託幫我撐個十秒左右就好！Switch！Startbrust Steam！"/>
                            </li>
                        </ul>
                    </div>

                    {/* Character B status section */}
                    <div>
                        <div className="grid w-min justify-items-center gap-4">
                            <RectCard imgsrc="https://images-ext-1.discordapp.net/external/x08twzHAcDIWcqHEPgEIdfLNoIGST3tHUdti0Ww3b00/https/mudae.net/uploads/1232276/v6uL2AsAjYy0QE0-4OKy~0P98O5C.png"/>
                            <WordBallon text="黑色劍士、二刀流、封弊者。擁有超群的反射神經和洞察力。" />
                            <AttributeBar attribute="HP" max={hpMax} val={hpVal}/>
                        </div>
                    </div>

                </div>

                

            </main>
        </div>
    )
}

export default Battle
