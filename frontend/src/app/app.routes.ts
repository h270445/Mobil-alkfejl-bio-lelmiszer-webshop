import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section>
      <h1>BioMarket</h1>
      <p>A frontend alapok készen állnak. Következő lépés a feature komponensek létrehozása.</p>
    </section>
  `
})
class HomeComponent {}

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
