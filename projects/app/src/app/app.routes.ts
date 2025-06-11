import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PrescanComponent } from './prescan/prescan.component';
import { DiscussComponent } from './discuss/discuss.component';
import { LoaderComponent } from './loader/loader.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { HomeComponent } from './home/home.component';
import { Pps25Component } from './showcase/pps25/pps25.component';
import { Pps25VComponent } from './showcase/pps25v/pps25.component';
import { Jma25Component } from './showcase/jma25/jma25.component';
import { OutputMapComponent } from './showcase/output-map/output-map.component';
import { ModerateComponent } from './admin/moderate/moderate.component';
import { CollectPropertiesComponent } from './collect-properties/collect-properties.component';

export const routes: Routes = [
    // Showcase routes
    { path: 'show/pps25w', component: Pps25Component },
    { path: 'show/pps25', component: Pps25VComponent },
    { path: 'show/jma25', component: Jma25Component },
    { path: 'show', component: OutputMapComponent },

    // Admin routes
    {
        'path': 'admin',
        'component': ModerateComponent
    },
    {
        'path': 'scan',
        'component': ScannerComponent
    },
    {
        'path': 'confirm',
        'component': ConfirmComponent
    },
    {
        'path': 'props',
        'component': CollectPropertiesComponent
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
        'path': 'prescan',
        'component': PrescanComponent,
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
            'redirectTo': '/prescan?workspace=ceaed215-e28a-4988-aca4-458c20d5cf1d&api_key=2dbffec8-9175-4dc4-b553-5b8cf085b5fe&tag=jma25',
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
        'path': 'testing',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=212aa064-4d02-4edb-8f0b-9f649d026fb2',
        }
    },    
    {
        'path': '',
        'component': HomeComponent
    }
];
