import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { HomeComponent } from './home/home.component';
import { DiscussComponent } from './discuss/discuss.component';
import { CompleteComponent } from './complete/complete.component';
import { LoaderComponent } from './loader/loader.component';

export const routes: Routes = [
    {
        'path': 'scan',
        'component': ScannerComponent
    },
    {
        'path': 'confirm',
        'component': ConfirmComponent
    },
    {
        'path': 'discuss/:item-id',
        'component': DiscussComponent
    },
    {
        'path': 'load',
        'component': LoaderComponent,
    },
    {
        'path': 'complete',
        'component': CompleteComponent
    },
    {
        'path': '',
        'component': HomeComponent
    }
];
