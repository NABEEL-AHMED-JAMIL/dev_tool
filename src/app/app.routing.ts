import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { SegmentComponent } from './segment';
import { XMLMakerComponent } from './xml_maker';
import { CaptchaComponent } from './captcha';
import { AuthorityComponent } from './authority';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'segment', component: SegmentComponent, canActivate: [AuthGuard] },
    // { path: 'xml_maker', component: XMLMakerComponent, canActivate: [AuthGuard] },
    // { path: 'authority', component: AuthorityComponent, canActivate: [AuthGuard] },
    // { path: 'image-process', component: CaptchaComponent, canActivate: [AuthGuard] },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    { path: '', component: HomeComponent },
    { path: 'segment', component: SegmentComponent },
    { path: 'xml_maker', component: XMLMakerComponent },
    { path: 'authority', component: AuthorityComponent },
    { path: 'image-process', component: CaptchaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);