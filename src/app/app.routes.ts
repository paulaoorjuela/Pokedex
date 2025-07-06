import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  {path: '', title: '', component: MainPageComponent},
  {path: 'pokemon/:name', title: '', component: PokemonDetailComponent}
];
