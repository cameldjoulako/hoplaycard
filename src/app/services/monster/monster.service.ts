import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  monsters: Monster[] = [];
  currentIndex: number = 1;

  constructor() {}

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

    return monsterCopy;
  }

  delete(id: number) {
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === id
    );

    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1);
    }
  }
}
