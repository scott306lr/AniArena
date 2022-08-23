import React from 'react'
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react"
import { BuiltInProviderType } from 'next-auth/providers';
import Navbar from '../../components/Navbar';

type Props = { providers:Promise<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>> }

// Browser...
function SignIntoProvider({providers}: Props) {
  return (
    <div className='grid'>
      <Navbar />
        <div className='grid mx-5 my-8 px-8 py-16 gap-4 w-80 justify-self-center place-content-center bg-white/75 rounded-md '>
          <div className='text-center text-lg font-medium'>歡迎回來！</div>
          <div className='text-center text-lg font-medium'>請選擇登入方式</div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="action-btn" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
    </div>
  )
}

export default SignIntoProvider

// SSR
export async function getServerSideProps(ctx) {
  const providers = await getProviders();

  return {
    props: { providers },
  }
}
