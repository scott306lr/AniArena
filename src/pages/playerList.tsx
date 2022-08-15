import type { NextPage } from 'next'
import ActionButton from '../components/ActionButton';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';
import SearchBar from '../components/SearchBar';
import PlayerCard from '../components/PlayerCard';
import Navbar from '../components/Navbar';

const PlayerList: NextPage = () => {
  const handleSearch = () => {console.log("search click")};
  const handleBattle = () => {console.log("Battle!")};

  // TODO: get player list from server, with infinite scroll
  const players = [
    {
      username: "Bob", 
      text: "hello I'm Bob" ,
      imgsrc: "https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"
    },
    {
      username: "Alice",
      text: "hello I'm Alice",
      imgsrc: "https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"
    },
    {
      username: "Charlie",
      text: "hello I'm Charlie",
      imgsrc: "https://media.discordapp.net/attachments/872026548692209738/872045442450485288/6fm6YnX.png"
    }
  ]
  return (
    <div>
      <Navbar />
      <main className="grid">
        
        {/* sections */}
        <div className="flex flex-wrap items-center justify-center m-4 p-4 gap-8">
          {/* section 2 */}
          <div className="grid gap-4 lg:w-1/4 w-5/6">
              <SearchBar onClick={() => handleSearch}/>
              {
                players.map((player, index) => (
                  <li key={index} className="grid w-full">
                    <PlayerCard key={player.username} name={player.username} text={player.text} imgsrc={player.imgsrc}/>
                  </li>
                ))
              }
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

export default PlayerList
