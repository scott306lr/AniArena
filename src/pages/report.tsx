import type { NextPage } from 'next'
import AttributeBar from '../components/AttributeBar';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';
import React from 'react'
import Navbar from '../components/Navbar';
import { inferQueryOutput, trpc } from '../utils/trpc';
import PlayerCard from '../components/PlayerCard';

const Battle: NextPage = () => {
    const [hpMax, setHpMax] = React.useState(15);
    const [hpVal, setHpVal] = React.useState(10);
    const increaseHp = () => setHpVal(Math.min(hpMax, hpVal+1));
    const decreaseHp = () => setHpVal(Math.max(0, hpVal-1));

    const [hp, setHp] = React.useState(7);
    // Todo: fetch data here
    const {data: p1, isLoading, error} = trpc.proxy.arena.check_p1.useQuery({with_id: "testtest"});
    // console.log(p1)
    return (
        <div>
            <Navbar />
            <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
                { isLoading ? <div>loading...</div> : <P1Skills p1={p1}/>}
            </main>
        </div>
    )
}

type CheckP1 = inferQueryOutput<"arena.check_p1"> | undefined;

const P1Skills: React.FC<{p1: CheckP1}> = (props) => {
    return (
        <>
            { props.p1?.combater ? 
                <>
                    <PlayerCard 
                        name={props.p1.name} 
                        text={props.p1.description} 
                        imgsrc={props.p1.combater.character.image}/>
                    <ul className="grid gap-3 pt-3 mt-3 text-center bg-red-100 lg:w-2/3">
                        <h2 className="text-lg text-gray-700">{"可使用技能:"}</h2>
                        {
                            props.p1.combater.character.skills.map((skill, index) => {
                                return(
                                    <li key={index}
                                        className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105"
                                    >
                                        <p className="text-sm text-gray-600"> {skill.name} </p>
                                        <a className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"> {skill.description} </a>
                                    </li> 
                                )
                            })
                        }
                    </ul> 
                </> : <div>{"Sad, no available players currently."}<br />{"Probably there's a connection error?"}</div>
            }
        </>
    )
}

export default Battle
