import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { useEffect, useRef, useState } from "react";
import { Dialog } from '@headlessui/react';
import MyModal from "../components/Modal";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Create <span className="text-purple-300">T3</span> App
        </h1>
        <p className="text-2xl text-gray-700">This stack uses:</p>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3">
          <TechnologyCard
            name="NextJS"
            description="The React framework for production"
            documentation="https://nextjs.org/"
          />
          <TechnologyCard
            name="TypeScript"
            description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
            documentation="https://www.typescriptlang.org/"
          />
          <TechnologyCard
            name="TailwindCSS"
            description="Rapidly build modern websites without ever leaving your HTML"
            documentation="https://tailwindcss.com/"
          />
          <TechnologyCard
            name="tRPC"
            description="End-to-end typesafe APIs made easy"
            documentation="https://trpc.io/"
          />
          <TechnologyCard
            name="Next-Auth"
            description="Authentication for Next.js"
            documentation="https://next-auth.js.org/"
          />
          <TechnologyCard
            name="Prisma"
            description="Build data-driven JavaScript & TypeScript apps in less time"
            documentation="https://www.prisma.io/docs/"
          />
        </div>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
          <AuthShowcase/>
          <HelloSomeone/>
          <MeProfile/>
          <PopoverTest/>
        </div>
      </main>
    </>
  );
};

export default Home;

const MeProfile: React.FC = () => {
  // const {data} = trpc.proxy.me.getSession.useQuery();
  const {data: myProfile, isLoading} = trpc.proxy.me.getProfile.useQuery();
  return (
    <div className="p-4 border-solid border-2 border-gray-500 rounded-lg">
      <p className="text-2xl">{myProfile?.name}</p>
      <p className="text-lg">{myProfile?.description}</p>
    </div>
  )
}

const PopoverTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-4 border-solid border-2 border-gray-500 rounded-lg">
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Hide' : 'Show'} Popover
      </button>
      <MyModal title="I'm title" isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-4 border-solid border-2 border-gray-500 rounded-lg">
          <p className="text-2xl">{"I'm content"}</p>
        </div>
      </MyModal>
    </div>
  )
}

const HelloSomeone: React.FC = () => {
  const [name, setName] = useState("")
  const {data: hellotxt, isLoading} = trpc.proxy.auth.getSecretTest.useQuery({myname: name})

  return (
    <div className="p-4 border-solid border-2 border-gray-500 rounded-lg">
      <div className='flex items-center justify-center w-full p-4 text-2xl text-blue-500'>
        { !isLoading ? <p>{hellotxt}</p> : <p>Loading..</p>}
      </div>
      <input 
        type="text" 
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key == "Enter"){
            setName(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  )
}

// Component to showcase protected routes using Auth
const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.proxy.auth.getSecretMessage.useQuery();
  const { data: sessionData } = useSession();

  return (
    <div className="p-4 border-solid border-2 border-gray-500 rounded-lg">
      {sessionData && <p>Logged in as {sessionData?.user?.name}</p>}
      {secretMessage && <p>{secretMessage}</p>}
      <button
        className="px-4 py-2 border-2 border-blue-500 rounded-md"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

// Technology component
type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
