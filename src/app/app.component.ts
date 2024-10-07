import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from './services/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PlayingCardComponent,
    SearchBarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  /* increaseCount() {
    this.count++;
  }

  toggleMonster() {
    this.selectedMonsterIndex.set(
      (this.selectedMonsterIndex() + 1) % this.monsters.length
    );
  } */

  private router = inject(Router);
  loginService = inject(LoginService);

  private logoutSubscripton: Subscription | null = null;

  logout() {
    this.logoutSubscripton = this.loginService.logout().subscribe({
      next: (_) => {
        this.navigateToLogin();
      },
      error: (_) => {
        this.navigateToLogin();
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.logoutSubscripton?.unsubscribe();
  }
}
