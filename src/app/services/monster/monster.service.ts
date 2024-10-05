import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  monsters: Monster[] = [];
  currentIndex: number = 1;

  constructor() {
    this.load();
  }

  getAll(): Monster[] {
    return this.monsters.map((monster) => monster.copy());
  }

  get(id: number): Monster | undefined {
    const monster = this.monsters.find((monster) => monster.id === id);

    return monster ? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();

    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());

    this.currentIndex++;

    this.save();

    return monsterCopy;
  }

  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === monster.id
    );

    if (monsterIndex != -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
    }

    this.save();

    return monsterCopy;
  }

  delete(id: number) {
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === id
    );

    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1);
    }

    this.save();
  }

  private save() {
    localStorage.setItem('monsters', JSON.stringify(this.monsters));
  }

  private load() {
    const monsterData = localStorage.getItem('monsters');

    if (monsterData) {
      this.monsters = JSON.parse(monsterData).map((monsterJSON: any) =>
        Object.assign(new Monster(), monsterJSON)
      );
      this.currentIndex = Math.max(
        ...this.monsters.map((monster) => monster.id)
      );
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    this.monsters = [];
    const monster1 = new Monster();

    monster1.name = 'Pik';
    monster1.hp = 40;
    monster1.figureCaption = 'N° 002 PIK';
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.name = 'Car';
    monster2.hp = 60;
    monster2.figureCaption = 'N° 003 Car';
    monster2.image = 'assets/img/water.jpg';
    monster2.type = MonsterType.WATER;
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.name = 'Bulb';
    monster3.hp = 84;
    monster3.figureCaption = 'N° 004 Bulb';
    monster3.image = 'assets/img/fire.jpg';
    monster3.type = MonsterType.FIRE;
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.name = 'Sala';
    monster4.hp = 55;
    monster4.figureCaption = 'N° 004 Sala';
    monster4.image = 'assets/img/elec.jpg';
    monster4.type = MonsterType.ELECTRIC;
    this.monsters.push(monster4);
  }
}
