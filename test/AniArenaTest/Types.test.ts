import { Arena, CombatLog } from '../../src/utils/AniClasses/Arena';
import { Player_JSON } from '../../src/utils/AniClasses/Types';

describe('type test', () => {
  const player_json1: Player_JSON = {
    id: 'cl74noa020210cbvhgy3p1ctx',
    createdAt: new Date('2022-08-22T11:09:10.946Z'),
    updatedAt: new Date('2022-08-22T11:05:49.163Z'),
    userId: 'cl747pr8k0018979tc4k8xj6k',
    name: '須鄉',
    description: '我有管理者權限哈哈哈哈哈',
    combater: {
      id: 'cl74o63wj0020wpvhyekqhcqz',
      createdAt: new Date('2022-08-22T11:09:10.946Z'),
      updatedAt: new Date('2022-08-22T11:05:49.163Z'),
      playerId: 'cl74noa020210cbvhgy3p1ctx',
      characterId: 1,
      attr: {
        AP: 5,
        HP: 15,
        exp: 9999,
        level: 99,
        APRegen: 20,
      },
      character: {
        id: 1,
        createdAt: new Date('2022-08-22T11:09:10.946Z'),
        updatedAt: new Date('2022-08-22T11:05:49.163Z'),
        name: '瓦力',
        image:
          'https://images-ext-1.discordapp.net/external/NwoQ6n6EF_KlhjmSezDNFmFxXCLl2-gxTfDKNddYnC4/https/mudae.net/uploads/1928259/Ph5SE52fDdJjU9jN1VcU~xu2VUef.png',
        description: '我是瓦力',
        orgAttr: {
          AP: 5,
          HP: 20,
          exp: 0,
          level: 1,
          APRegen: 5,
        },
        skills: [
          {
            id: 1,
            createdAt: new Date('2022-08-22T11:09:10.946Z'),
            updatedAt: new Date('2022-08-22T11:05:49.163Z'),
            name: '火球術',
            image: null,
            description: '儘管是最基礎的攻擊魔法，也要耗費三十年習得',
            requirement: {
              level: 0,
            },
            cost: {
              AP: 5,
              HP: 0,
            },
          },
        ],
      },
    },
  };

  const player_json2: Player_JSON = {
    id: 'cl74noa020210cbvhgy3p1ctx',
    createdAt: new Date('2022-08-22T11:09:10.946Z'),
    updatedAt: new Date('2022-08-22T11:05:49.163Z'),
    userId: 'cl747pr8k0018979tc4k8xj6k',
    name: '工程師',
    description: '我有管理者權限哈哈哈哈哈',
    combater: {
      id: 'cl74o63wj0020wpvhyekqhcqz',
      createdAt: new Date('2022-08-22T11:09:10.946Z'),
      updatedAt: new Date('2022-08-22T11:05:49.163Z'),
      playerId: 'cl74noa020210cbvhgy3p1ctx',
      characterId: 1,
      attr: {
        AP: 5,
        HP: 15,
        exp: 9999,
        level: 99,
        APRegen: 20,
      },
      character: {
        id: 1,
        createdAt: new Date('2022-08-22T11:09:10.946Z'),
        updatedAt: new Date('2022-08-22T11:05:49.163Z'),
        name: '瓦力',
        image:
          'https://images-ext-1.discordapp.net/external/NwoQ6n6EF_KlhjmSezDNFmFxXCLl2-gxTfDKNddYnC4/https/mudae.net/uploads/1928259/Ph5SE52fDdJjU9jN1VcU~xu2VUef.png',
        description: '我是瓦力',
        orgAttr: {
          AP: 5,
          HP: 20,
          exp: 0,
          level: 1,
          APRegen: 5,
        },
        skills: [
          {
            id: 1,
            createdAt: new Date('2022-08-22T11:09:10.946Z'),
            updatedAt: new Date('2022-08-22T11:05:49.163Z'),
            name: '火球術',
            image: null,
            description: '儘管是最基礎的攻擊魔法，也要耗費三十年習得',
            requirement: {
              level: 0,
            },
            cost: {
              AP: 5,
              HP: 0,
            },
          },
        ],
      },
    },
  };

  it('type test', () => {
    console.log('type testing');
    const arena = new Arena(player_json1, player_json2);
    arena.start();
    const log: CombatLog = arena.getLog();
    console.log(log);
    // if(log.logs !== undefined){
    //     for( let i = 0; i < log.logs.length; ++i){
    //         if(log.logs[i] !== undefined){
    //             console.log(log.logs[i].logger);
    //             console.log(log.logs[i].log);
    //         }
    //     }
    // }
  });
});
