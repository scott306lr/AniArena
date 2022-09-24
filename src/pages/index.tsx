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
        {/* sections */}
        <div className="m-8 flex items-center justify-center gap-8">
          {isLoading || myProfile == null ? (
            <p className="word-bubble">{'Loading...'}</p>
          ) : (
            <div className="m-8 flex flex-col items-center justify-center gap-8">
              <UserProfile profile={myProfile} />
              <CharProfile combater={myProfile.combater} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

type ProfileType = inferProcedureOutput<AppRouter['me']['getProfile']>;
const UserProfile: React.FC<{ profile: ProfileType }> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-white/70 p-8">
      <PostableName orgText={props.profile.name} />
      <PostableDescription orgText={props.profile.description} />
    </div>
  );
};

const CharProfile: React.FC<{ combater: ProfileType['combater'] }> = (props) => {
  if (props.combater == null) {
    return <p className="word-bubble">{'No profile'}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="p-2 text-center text-xl"> {props.combater.character.name} </h2>
      <RectCard imgsrc={props.combater.character.image} />
      <p className="p-2 text-center text-lg"> {'可使用技能:'} </p>
      {props.combater.character.skills.map((skill, index) => {
        return (
          <li key={index} className="word-bubble">
            {`${skill.name}: ${skill.description}`}
          </li>
        );
      })}
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
        {isLoading ? 'Loading...' : isEditing ? 'Save' : 'Edit'}
      </button>
      <button
        className={`button-primary ${!isEditing ? 'hidden' : 'block'}`}
        onClick={() => {
          setText(props.orgText);
          setEditing(false);
        }}
      >
        Cancel
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
        {isLoading ? 'Loading...' : isEditing ? 'Save' : 'Edit'}
      </button>
      <button
        className={`button-primary ${!isEditing ? 'hidden' : 'block'}`}
        onClick={() => {
          setText(props.orgText ?? '');
          setEditing(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Home;
