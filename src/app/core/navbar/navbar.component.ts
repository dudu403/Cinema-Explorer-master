import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  valorInput: string = "";

  constructor(private router: Router) { }

  menuExpanded = false; 

  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
  }



}
