import { Routes } from '@angular/router';
import { OutputMapComponent } from './output-map/output-map.component';
import { Pps25Component } from './pps25/pps25.component';

export const routes: Routes = [
    { path: 'pps25', component: Pps25Component },
    { path: '', component: OutputMapComponent }
];
