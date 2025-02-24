import { Component, OnInit } from '@angular/core';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet />
  `,
  standalone: false,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private primeNg: PrimeNG) {}

  ngOnInit(): void {
    this.primeNg.ripple.set(true);
  }
  
}
