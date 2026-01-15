import { Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PrescanComponent } from './prescan/prescan.component';
import { DiscussComponent } from './discuss/discuss.component';
// import { LoaderComponent } from './loader/loader.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { HomeComponent } from './home/home.component';
import { Pps25Component } from './showcase/pps25/pps25.component';
import { Pps25VComponent } from './showcase/pps25v/pps25.component';
import { Jma25Component } from './showcase/jma25/jma25.component';
import { OutputMapComponent } from './showcase/output-map/output-map.component';
import { CollectPropertiesComponent } from './collect-properties/collect-properties.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { ShowcaseWsComponent } from './showcase-ws/showcase-ws.component';
import { CanvasCreatorComponent } from './canvas-creator/canvas-creator.component';
import { LoginComponent } from './admin/login/login.component';
import { ModerateComponent } from './admin/moderate/moderate.component';
import { WorkspaceFormComponent } from './admin/workspace-form/workspace-form.component';
import { AdminComponent } from './admin/admin/admin.component';

export const routes: Routes = [
    // Showcase routes
    { path: 'show/pps25w', component: Pps25Component },
    { path: 'show/pps25', component: Pps25VComponent },
    { path: 'show/jma25', component: Jma25Component },
    { path: 'show', component: OutputMapComponent },

    // Showcase2
    // { path: 'showcase-ws', component: ShowcaseWsComponent },
    { path: 'showcase-ws', loadComponent: () => import('./showcase-ws/showcase-ws.component').then(m => m.ShowcaseWsComponent) },

    // Admin routes
    {
        'path': 'admin/login',
        component: LoginComponent
    },
    {
        'path': 'admin/moderate',
        component: ModerateComponent
    },
    {
        'path': 'admin/new',
        component: WorkspaceFormComponent,
        canActivate: [AuthGuard],
    },
    {
        'path': 'admin/edit/:workspaceId',
        component: WorkspaceFormComponent,
        canActivate: [AuthGuard],
    },
    {
        'path': 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
    },
    {
        'path': 'scan',
        'component': ScannerComponent
    },
    {
        'path': 'canvas-creator',
        'component': CanvasCreatorComponent
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
    // {
    //     'path': 'load',
    //     'component': LoaderComponent,
    // },
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
        'path': 'jma25',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/nl/prescan?workspace=ceaed215-e28a-4988-aca4-458c20d5cf1d&api_key=2dbffec8-9175-4dc4-b553-5b8cf085b5fe&tag=jma25',
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
        'path': 'testing-ws',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/?workspace=61358757-cf32-483f-847f-3e4eb3855408&api_key=212aa064-4d02-4edb-8f0b-9f649d026fb2&ws=true',
        }
    },
    {
        'path': 'ajeec',
        'component': RedirectorComponent,
        'data': {
            'redirectTo': '/he/?workspace=6043fe29-bedb-45cb-8057-b63723b1a26e&api_key=86c03c59-0502-498f-9ccd-23e6f8a17682&ws=true',
        }
    },
    {
        'path': 'privacy-policy',
        'component': AboutComponent,
        'data': {
            'prefix': 'privacy-policy-',
        }
    },
    {
        'path': '',
        'component': HomeComponent
    }
];
