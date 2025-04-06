import { Routes } from '@angular/router';
import { ScannerComponent } from '../../scanner/scanner.component';
import { ConfirmComponent } from '../../confirm/confirm.component';
import { HomeComponent } from '../../home/home.component';
import { DiscussComponent } from '../../discuss/discuss.component';
import { CompleteComponent } from '../../complete/complete.component';

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
        'path': 'discuss',
        'component': DiscussComponent
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
