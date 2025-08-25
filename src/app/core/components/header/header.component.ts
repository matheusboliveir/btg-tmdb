import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderItems } from '../../config/header-items';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CoreRoutes } from '../../config/core-routes';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    AngularSvgIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public headerItems = HeaderItems;
  public search = '';

  private router = inject(Router);

  public searchMovie(): void {
    const cleanSearch = this.search.trim();
    if (!cleanSearch.length) return;
    this.router.navigate([CoreRoutes.SEARCH, this.search, 1]);
  }
}
