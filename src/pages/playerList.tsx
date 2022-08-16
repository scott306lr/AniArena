import type { NextPage } from 'next'
import ActionButton from '../components/ActionButton';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';
import SearchBar from '../components/SearchBar';
import PlayerCard from '../components/PlayerCard';
import Navbar from '../components/Navbar';
import { inferQueryOutput, trpc } from '../utils/trpc';

const PlayerList: NextPage = () => {
  const { data: profiles, isLoading } = trpc.proxy.getInfo.getAllProfiles.useQuery();
  const handleSearch = () => {console.log("search click")};
  const handleBattle = () => {console.log("Battle!")};

  return (
    <div>
      <Navbar />
      <main className="grid">
        
        {/* sections */}
        <div className="flex flex-wrap items-center justify-center m-4 p-4 gap-8">
          {/* section 2 */}
          <div className="grid gap-4 lg:w-1/4 w-5/6">
              <SearchBar onClick={() => handleSearch}/>
              { isLoading ? <div>loading...</div> : <MyPlayerList profiles={profiles}/>}
          </div>
          <div className="grid items-center gap-4">
            <RectCard imgsrc="https://images-ext-1.discordapp.net/external/x08twzHAcDIWcqHEPgEIdfLNoIGST3tHUdti0Ww3b00/https/mudae.net/uploads/1232276/v6uL2AsAjYy0QE0-4OKy~0P98O5C.png" />
            <ActionButton text="發起決鬥" onClick={() => handleBattle} />
          </div>
          {/* section 3 */}
          <div className="space-y-4">
            <WordBallon text="ID: 22261744" />
            <WordBallon text="Name: Admin" />
          </div>
        </div>

      </main>
    </div>
  )
}

type ProfilesFromServer = inferQueryOutput<"getInfo.getAllProfiles"> | undefined;

const MyPlayerList: React.FC<{profiles: ProfilesFromServer}> = (props) => {
  return (
    <>
      { props.profiles ? props.profiles.map((profile) => {
          return(
            <li key={profile.combaterId} className="grid w-full">
              { profile?.combater &&
                <PlayerCard 
                  key={profile.combaterId} 
                  name={profile.name} 
                  text={profile.description} 
                  imgsrc={profile.combater.character.image}/>
              }
            </li> 
          )
        }) : <div>{"Sad, no available players currently."}<br />{"Probably there's a connection error?"}</div>
      }
    </>
  )
}

export default PlayerList
