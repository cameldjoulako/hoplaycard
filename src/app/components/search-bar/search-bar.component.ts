import {
  Component,
  EventEmitter,
  Input,
  input,
  model,
  output,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  /* @Output() searchButtonClicked = new EventEmitter(); */
  searchButtonClicked = output();

  /*  @Input() search = 'Initial'; */ //methode 1
  /*   search = input<string>('Initial');//method 2
   */ search = model<string>('Initial'); //method 3

  //output pour notifier de chaque changement, notre composant parent
  /* @Output() searchChange = new EventEmitter<string>(); */
  /*searchChange = output<string>();*/
  searchClick() {
    //pour emmetre l'evenement et informer les composants parent
    this.searchButtonClicked.emit();
  }

  //updateSearch(value: string) {
  /* this.searchChange.emit(value); */ //fonctionne avec 1 et 2
  // this.search.set(value);
  //}
}
