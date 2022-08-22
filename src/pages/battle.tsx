import type { NextPage } from 'next'
import AttributeBar from '../components/AttributeBar';
import RectCard from '../components/RectCard';
import React from 'react'
import Navbar from '../components/Navbar';
import Avatar from '../components/Avatar';

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
                <div className="flex flex-wrap justify-center m-2 p-2 gap-4">
                    {/* Character A status section */}
                    <div className='flex lg:grid w-5/12 lg:w-min bg-slate-50 p-4 rounded-lg justify-items-center lg:gap-4'>
                        <div>
                            <div className='hidden lg:grid gap-4'>
                                <RectCard imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                                <p className='word-bubble'>
                                    {"其名惠惠，職業乃大法師，使役最強之攻擊魔法：爆裂魔法之人！"}
                                </p>
                            </div>
                            <div className='lg:hidden'>
                                <Avatar className="h-12 w-12" imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                            </div>
                        </div>
                        <div className="w-full">
                            <AttributeBar attribute="HP" max={hpMax} val={hpVal}/>
                            <AttributeBar attribute="HP" max={hpMax} val={hpVal}/>
                        </div>
                    </div>

                    {/* Character B status section */}
                    <div className='lg:order-last flex lg:grid w-5/12 lg:w-min bg-slate-50 p-4 rounded-lg justify-items-center lg:gap-4'>
                        <div>
                            <div className='hidden lg:grid gap-4'>
                                <RectCard imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                                <p className='word-bubble'>
                                    {"其名惠惠，職業乃大法師，使役最強之攻擊魔法：爆裂魔法之人！"}
                                </p>
                            </div>
                            <div className='lg:hidden'>
                                <Avatar className="h-12 w-12" imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                            </div>
                        </div>
                        <div className="w-full">
                            <AttributeBar attribute="HP" max={hpMax} val={hpVal}/>
                            <AttributeBar attribute="HP" max={hpMax} val={hpVal}/>
                        </div>
                    </div>

                    <div className='w-full lg:hidden'></div>

                    <div className="flex w-full lg:w-1/3">
                        <ul className="grid gap-4 h-fit p-2">
                            <li className="flex justify-start w-full pr-6">
                                <p className='word-bubble'>
                                    {"黑より黑く 闇より暗き漆黑に ，我が深紅の混淆を望みたもう，覺醒のとき來たれり，無謬の境界に落ちし理，無行の歪みとなりて，現出せよ！Explosion！"}
                                </p>
                            </li>
                            <li className="flex justify-end w-full pl-6">
                                <p className='word-bubble'>
                                    {"亞絲娜！克萊茵！拜託幫我撐個十秒左右就好！Switch！Startbrust Steam！"}
                                </p>
                            </li>
                        </ul>
                    </div>

                    
                    

                </div>

                

            </main>
        </div>
    )
}

export default Battle
