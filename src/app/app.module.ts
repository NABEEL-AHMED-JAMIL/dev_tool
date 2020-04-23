import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// used to create fake backend
import { fakeBackendProvider, XmlPipe, SafePipe, FilterPipe } from './_helpers';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { XMLMakerComponent } from './xml_maker';
import { CaptchaComponent } from './captcha';
import { SegmentComponent } from './segment';
import { FormParserComponent } from './form_parser';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { WebsocketService } from './_services';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        XMLMakerComponent,
        CaptchaComponent,
        SegmentComponent,
        FormParserComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        XmlPipe,
        SafePipe,
        FilterPipe
    ],
    providers: [
        WebsocketService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };