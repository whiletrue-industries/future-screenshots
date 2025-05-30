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
            'redirectTo': '/he/?workspace=03da8ede-395b-4fd2-b46e-bc2bc7f4035c&api_key=a356977d-219f-4d65-ae18-d8e98280bca1',
        }
    },
    {
        'path': 'timeisnow25',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/he/?workspace=03da8ede-395b-4fd2-b46e-bc2bc7f4035c&api_key=a356977d-219f-4d65-ae18-d8e98280bca1',
        }
    },
    {
        'path': 'radical2505',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/he/?workspace=3c4496be-258d-4e32-803f-4f2cd67afa15&api_key=51760995-7a38-4f7a-b055-5415239f77de',
        }
    },
    {
        'path': 'jma25',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/?workspace=ceaed215-e28a-4988-aca4-458c20d5cf1d&api_key=2dbffec8-9175-4dc4-b553-5b8cf085b5fe',
        }
    },
    {
        'path': 'ppsjlm',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/he/?workspace=b5c32453-b748-4bac-8e28-5dc04a32c91d&api_key=f52ff81e-75bb-45cf-9363-e8f9a1a30a7d',
        }
    },
    {
        'path': 'mndl2505',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/?workspace=b4ce1eae-9add-4854-bd7c-5d90dbe31134&api_key=fa3d6160-f061-4159-afd1-5e654c29ffc5',
        }
    },
    {
        'path': '',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/show'
        }
    }
];
