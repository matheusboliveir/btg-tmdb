import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderItems } from '../../config/header-items';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, AngularSvgIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public headerItems = HeaderItems;

}
