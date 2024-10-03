import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Output() searchButtonClicked = new EventEmitter();

  @Input() search = 'Initial';

  //output pour notifier de chaque changement, notre composant parent
  @Output() searchChange = new EventEmitter<string>();

  searchClick() {
    //pour emmetre l'evenement et informer les composants parent
    this.searchButtonClicked.emit();
  }

  updateSearch(value: string) {
    this.searchChange.emit(value);
  }
}
