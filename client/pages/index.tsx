import Navbar from '../components/Navbar';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import RectCard from '../components/RectCard';
import WordBallon from '../components/WordBallon';

const Home: NextPage = () => {
  const { data: session } = useSession()
  
  return (
    <div>
      <Navbar />
      <main className="grid">
        {/* sections */}
        <div className="flex items-center justify-center m-8 gap-8">
          {/* section 2 */}
          <div>
            <RectCard imgsrc="https://images-ext-1.discordapp.net/external/x08twzHAcDIWcqHEPgEIdfLNoIGST3tHUdti0Ww3b00/https/mudae.net/uploads/1232276/v6uL2AsAjYy0QE0-4OKy~0P98O5C.png" />
          </div>
          {/* section 3 */}
          <div className="space-y-4">
            <WordBallon text={`ID: ${session?.user.email}`} />
            <WordBallon text={`NAME: ${session?.user.name}`}  />
          </div>
        </div>

      </main>
    </div>
  )
}

export default Home
