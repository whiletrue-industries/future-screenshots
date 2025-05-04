import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { HomeComponent } from './home/home.component';
import { DiscussComponent } from './discuss/discuss.component';
import { LoaderComponent } from './loader/loader.component';
import { RedirectorComponent } from './redirector/redirector.component';

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
        'path': 'discuss',
        'component': DiscussComponent
    },
    {
        'path': 'load',
        'component': LoaderComponent,
    },
    {
        'path': 'pps25',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/?workspace=03da8ede-395b-4fd2-b46e-bc2bc7f4035c&api_key=a356977d-219f-4d65-ae18-d8e98280bca1',
        }
    },
    {
        'path': 'timeisnow25',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/?workspace=03da8ede-395b-4fd2-b46e-bc2bc7f4035c&api_key=a356977d-219f-4d65-ae18-d8e98280bca1',
        }
    },
    {
        'path': '',
        'component': HomeComponent
    }
];
