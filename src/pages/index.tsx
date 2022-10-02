import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import type { NextPage } from 'next';
import RectCard from '../components/RectCard';
import { trpc } from '../utils/trpc';

import type { inferProcedureOutput, inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '../server/trpc/router';

const Home: NextPage = () => {
  const { data: myProfile, isLoading, error } = trpc.me.getProfile.useQuery();
  console.log(myProfile);
  console.log(error);

  return (
    <div>
      <Navbar />
      <main className="grid">
        {isLoading || myProfile == null ? (
          <p className="word-bubble">{'Loading...'}</p>
        ) : (
          <div className="m-8 flex flex-col items-center justify-center gap-8">
            {/* sections */}

            <section className="flex w-3/6 flex-col items-center justify-center gap-2 rounded-md bg-white/70 p-8 pt-4">
              <h1 className="text-2xl font-bold">{'使用角色'}</h1>
              <CharProfile combater={myProfile.combater} />
            </section>
            <section className="flex w-3/6 flex-col items-center justify-center gap-4 rounded-md bg-white/70 p-8 pt-4">
              <h1 className="text-2xl font-bold">{'個人資料'}</h1>

              <PostableName orgText={myProfile.name} />
              <PostableDescription orgText={myProfile.description} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

type ProfileType = inferProcedureOutput<AppRouter['me']['getProfile']>;
const CharProfile: React.FC<{ combater: ProfileType['combater'] }> = (props) => {
  if (props.combater == null) {
    return <p className="word-bubble">{'No profile'}</p>;
  }

  return (
    <div className="flex justify-center gap-4">
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="p-2 text-center text-2xl"> {props.combater.character.name} </h2>
        <RectCard imgsrc={props.combater.character.image} />
      </div>
      <div className="flex grow items-center">
        <div className="flex h-full flex-col gap-y-2 py-16">
          <p className="p-2 text-center text-lg"> {'可使用技能:'} </p>
          {props.combater.character.skills.map((skill, index) => {
            return (
              <li key={index} className="word-bubble">
                {`${skill.name}: ${skill.description}`}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PostableName: React.FC<{ orgText: string }> = (props) => {
  const [text, setText] = useState(props.orgText);
  const [isEditing, setEditing] = useState(false);

  // mutation for updating name... trpc v10 has BAD documentation....
  // https://github.com/planetscale/beam/blob/main/pages/index.tsx is a good example
  const utils = trpc.useContext();
  const {
    mutate: mutateName,
    isLoading,
    error,
  } = trpc.me.postName.useMutation({
    onMutate: async (input) => {
      await utils.me.getProfile.cancel();
      const previousProfile = utils.me.getProfile.getData();
      utils.me.getProfile.setData(() => {
        return { ...previousProfile, name: input.name } as ProfileType;
      });
    },
    onSuccess: () => {
      utils.me.getProfile.refetch();
    },
  });

  return (
    <div className="flex items-center justify-center">
      <h3 className="text-xl">{'我的暱稱：'}</h3>
      <input
        className="word-bubble"
        type="text"
        disabled={!isEditing}
        onChange={(e) => setText(e.target.value)}
        value={error ? 'Error' : text}
      />
      <button
        className="button-primary"
        disabled={isLoading}
        onClick={() => {
          const ttext = text.trim();
          if (ttext === '') return;
          if (isEditing && ttext !== props.orgText) mutateName({ name: ttext });
          setEditing((prev) => !prev);
        }}
      >
        {isLoading ? 'Loading...' : isEditing ? '儲存' : '修改'}
      </button>
      <button
        className={`button-primary bg-red-500 ${!isEditing ? 'hidden' : 'block'}`}
        onClick={() => {
          setText(props.orgText);
          setEditing(false);
        }}
      >
        取消
      </button>
    </div>
  );
};

const PostableDescription: React.FC<{ orgText: string | null }> = (props) => {
  const [text, setText] = useState(props.orgText ?? '');
  const [isEditing, setEditing] = useState(false);

  // mutation for updating name... trpc v10 has BAD documentation....
  // https://github.com/planetscale/beam/blob/main/pages/index.tsx is a good example
  const utils = trpc.useContext();
  const {
    mutate: mutateName,
    isLoading,
    error,
  } = trpc.me.postDescription.useMutation({
    onMutate: async (input) => {
      await utils.me.getProfile.cancel();
      const previousProfile = utils.me.getProfile.getData();
      utils.me.getProfile.setData(() => {
        return { ...previousProfile, description: input.description } as ProfileType;
      });
    },
    onSuccess: () => {
      utils.me.getProfile.refetch();
    },
  });

  return (
    <div className="flex items-center justify-center">
      <h3 className="text-xl">{'個人狀態：'}</h3>
      <input
        className="word-bubble"
        type="text"
        disabled={!isEditing}
        onChange={(e) => setText(e.target.value)}
        value={error ? 'Error' : text}
      />
      <button
        className="button-primary"
        disabled={isLoading}
        onClick={() => {
          const ttext = text.trim();
          if (ttext === '') return;
          if (isEditing && ttext !== props.orgText) mutateName({ description: ttext });
          setEditing((prev) => !prev);
        }}
      >
        {isLoading ? 'Loading...' : isEditing ? '儲存' : '修改'}
      </button>
      <button
        className={`button-primary bg-red-500 ${!isEditing ? 'hidden' : 'block'}`}
        onClick={() => {
          setText(props.orgText ?? '');
          setEditing(false);
        }}
      >
        取消
      </button>
    </div>
  );
};

export default Home;
