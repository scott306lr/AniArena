import React from 'react';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import Navbar from '../../components/Navbar';

type Props = { providers: Promise<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>> };

// Browser...
function SignIntoProvider({ providers }: Props) {
  return (
    <div className="grid">
      <Navbar />
      <div className="mx-5 my-8 grid w-80 place-content-center gap-4 justify-self-center rounded-md bg-white/75 px-8 py-16 ">
        <div className="text-center text-lg font-medium">歡迎回來！</div>
        <div className="text-center text-lg font-medium">請選擇登入方式</div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="action-btn" onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SignIntoProvider;

// SSR
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
