import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlayingCardComponent,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private formBuilder = inject(FormBuilder);

  private monsterService = inject(MonsterService);

  private readonly dialog = inject(MatDialog);

  //gestion des erreurs avec formcontrol
  /* name = new FormControl('', [Validators.required]);
  hp = new FormControl('', [
    Validators.required,
    Validators.min(0),
    Validators.max(200),
  ]); */

  //gestion des erreurs avec formGroup
  /* formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    type: new FormControl(MonsterType.ELECTRIC, [Validators.required]),
    hp: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
    ]),
    figureCaption: new FormControl('', [Validators.required]),
    attackName: new FormControl('', [Validators.required]),
    attackStrength: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
    ]),
    attackDescription: new FormControl('', [Validators.required]),
  }); */

  //gestion des erreurs avec FormBuilder
  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [
      0,
      [Validators.required, Validators.min(1), Validators.max(200)],
    ],
    attackDescription: ['', [Validators.required]],
  });

  routeSubscription: Subscription | null = null;

  monsterTypes = Object.values(MonsterType);
  /* monsterId = signal<number | undefined>(undefined); */
  monsterId = -1;

  private formValuesSubscription: Subscription | null = null;

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);

  ngOnInit(): void {
    /* const params = this.route.snapshot.params; */
    this.routeSubscription = this.route.params.subscribe((params) => {
      /* this.monsterId.set(
        params['monster'] ? parseInt(params['monster']) : undefined
      ); */

      if (params['monster']) {
        this.monsterId = parseInt(params['monster']);
        const monsterFound = this.monsterService.get(this.monsterId);

        if (monsterFound) {
          this.monster = monsterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });

    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(
      (data) => {
        this.monster = Object.assign(new Monster(), data);
      }
    );
  }

  /* next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate(['/monster/' + nextId]);
  } */

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formValuesSubscription?.unsubscribe();
  }

  submit(event: Event) {
    event.preventDefault();

    if (this.monsterId === -1) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }

    this.navigateBack();
  }

  /*  setChanged() {
    this.name.setValue('Changed');
  } */

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);

    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string,
        });
      };
    }
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  deleteMonster() {
    const dialogRef = this.dialog.open(
      DeleteMonsterConfirmationDialogComponent
    );
    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.monsterService.delete(this.monsterId);
        this.navigateBack();
      }
    });
  }
}
