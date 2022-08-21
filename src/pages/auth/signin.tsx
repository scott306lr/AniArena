import React from 'react'
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react"
import { BuiltInProviderType } from 'next-auth/providers';
import Navbar from '../../components/Navbar';

type Props = { providers:Promise<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>> }

// Browser...
function SignIntoProvider({providers}: Props) {
  return (
    <>
      <Navbar />
      <div className='grid h-64 place-content-center'>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="action-btn" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
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
