import type { NextPage } from 'next'
import AttributeBar from '../components/AttributeBar';
import Avatar from '../components/Avatar';
import RectCard from '../components/RectCard';
import React, { useState } from 'react'
import SkillCard from '../components/SkillCard';
import AttributeAdjustor from '../components/AttributeAdjustor';
import Navbar from '../components/Navbar';
import { inferQueryOutput, trpc } from '../utils/trpc';

const Reborn: NextPage = () => {
    const [selected, setSelected] = useState(0);

    const {data: unlockedChars, isLoading: u_isLoading} = trpc.proxy.me.getUnlockedChar.useQuery();
    // const {data: combater, isLoading: c_isLoading} = trpc.proxy.me.getCombater.useQuery();

    return (
        <div>
            <Navbar />
            <main className="grid gap-4">
                {/* middle characters section*/}
                {/*      Add click event */}
                <div className="grid place-content-center p-2">
                    <ul className="flex flex-wrap bg-white rounded-lg shadow-lg">
                        { 
                            (u_isLoading || unlockedChars == null) ? (
                                <div className="flex justify-center">
                                    <div className="spinner"></div>
                                </div>
                            ) : (
                                unlockedChars.map((character, index) => (
                                    <li key={index} className="md:w-1/2 md:h-1/2" onClick={() => setSelected(index)}>
                                        <Avatar imgsrc={character?.image} />
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>

                {/* Character status section */}
                {u_isLoading || unlockedChars == null ? 
                    <div>loading...</div> 
                    : 
                    <CharacterProfile character={unlockedChars[selected]}/>
                }
                
                
            </main>
        </div>
    );
}

export default Reborn


type CharProfile = inferQueryOutput<"me.getUnlockedChar">[number] | undefined;
type attr = {
    AP: number,
    HP: number,
    APRegen: number,
}

// Ensured that profile is not undefined before passing in, but checked again for typescript ensurance

const CharacterProfile: React.FC<{character: CharProfile}> = (props) => {
    const [attr, setAttr] = useState(props.character?.orgAttr as attr);
    const addHP = () => setAttr({...attr, HP: attr.HP+1});
    const minusHP = () => setAttr({...attr, HP: attr.HP-1});
    const addAP = () => setAttr({...attr, AP: attr.AP+1});
    const minusAP = () => setAttr({...attr, AP: attr.AP-1});
    const addAPRegen = () => setAttr({...attr, APRegen: attr.APRegen+1});
    const minusAPRegen = () => setAttr({...attr, APRegen: attr.APRegen-1});

    // console.log(props.character?.orgAttr)

    const resetClick = () => {setAttr(props.character?.orgAttr as attr)};
    const confirmClick = () => {console.log("confirm clicked")};

    return (
        <div className="flex flex-wrap w-10/12 sm:w-auto m-4 p-4 gap-4 rounded-md bg-white shadow-lg justify-self-center justify-center">
            <div className='grid gap-4 justify-items-center'>
                <RectCard imgsrc={props.character?.image} />
                <div className='word-bubble'>{props.character?.description}</div>
            </div>
            <div className="grid place-content-center">
                    <div className="grid gap-4">
                        <AttributeAdjustor name="HP" value={attr.HP} minusClick={minusHP} addClick={addHP}/>
                        <AttributeAdjustor name="AP" value={attr.AP} minusClick={minusAP} addClick={addAP}/>
                        <AttributeAdjustor name="APRegen" value={attr.APRegen} minusClick={minusAPRegen} addClick={addAPRegen}/>
                        <button onClick={resetClick} className='action-btn'>
                            {"重設"}
                        </button>
                        <button onClick={confirmClick} className='action-btn'>
                            {"確認"}
                        </button>
                    </div>
            </div>
                
        </div>
    );
}


{/* SkillCards Section */}
{/*Todo: change it to filter map  */}
{/* <div className="grid lg:w-1/3 place-content-center">
    <ul className="grid gap-4">
        { u_isLoading ? (
            <div className="flex justify-center">
                <div className="spinner"></div>
            </div>
            ) : (
                Skills.map((skill, index) => (
                    <li key={index} className="grid w-full">
                        <SkillCard name={skill.name} type={skill.type} description={skill.description} imgsrc="https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"/>
                    </li>
                ))
            )
        }
    </ul>
</div> */}
