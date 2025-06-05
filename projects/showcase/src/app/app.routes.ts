import { Routes } from '@angular/router';
import { OutputMapComponent } from './output-map/output-map.component';
import { Pps25Component } from './pps25/pps25.component';
import { Pps25VComponent } from './pps25v/pps25.component';
import { Jma25Component } from './jma25/jma25.component';

export const routes: Routes = [
    { path: 'pps25w', component: Pps25Component },
    { path: 'pps25', component: Pps25VComponent },
    { path: 'jma25', component: Jma25Component },
    { path: '', component: OutputMapComponent }
];
