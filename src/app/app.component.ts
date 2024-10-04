import { Component, computed, effect, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { Monster } from './models/monster.model';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PlayingCardComponent,
    SearchBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Hoplaycard';

  count: number = 0;
  /* monster1!: Monster; */

  monsters!: Monster[];
  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters.filter((monster) =>
      monster.name.includes(this.search())
    );
  });
  //index du monstre sélectioner
  selectedMonsterIndex = signal(1);

  //Montre à affiché
  selectedMonster = computed(() => {
    return this.monsters[this.selectedMonsterIndex()];
  });

  constructor() {
    /* effect(() => {
      console.log(this.selectedMonster());
    }); */

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

  /* increaseCount() {
    this.count++;
  }

  toggleMonster() {
    this.selectedMonsterIndex.set(
      (this.selectedMonsterIndex() + 1) % this.monsters.length
    );
  } */
}
