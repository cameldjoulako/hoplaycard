export enum MonsterType {
  PLANT = 'plan',
  ELECTRIC = 'electric',
  FIRE = 'fire',
  WATER = 'water',
}

export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: { [key: string]: IMonsterProperties } = {
  [MonsterType.PLANT]: {
    imageUrl: 'assets/img/water.jpg',
    color: 'rgba(15,255,124)',
  },
  [MonsterType.ELECTRIC]: {
    imageUrl: 'assets/img/play.jpg',
    color: 'rgba(255,104,104)',
  },
  [MonsterType.FIRE]: {
    imageUrl: 'assets/img/fire.jpg',
    color: 'rgba(215,120,104)',
  },
  [MonsterType.WATER]: {
    imageUrl: 'assets/img/elec.jpg',
    color: 'rgba(35,255,104)',
  },
};
