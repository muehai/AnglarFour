import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ContactComponent } from './components/contact/contact.component';
import { Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_BASE_HREF, CommonModule, Location, LocationStrategy, HashLocationStrategy }
    from '@angular/common';

//third party module to display toast
import { ToastrModule } from 'toastr-ng2';
//PRIMENG - Third party module
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

//import the contact service
import { ContactService } from './_service/index';


class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();
    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ContactComponent
    ],

    //Add provider
    providers: [ContactService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RequestOptions, useClass: AppBaseRequestOptions }],

    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        InputTextModule,DataTableModule, ButtonModule, DialogModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'contact', pathMatch: 'full' },
            { path: 'contact', component: ContactComponent },
            { path: '**', redirectTo: 'contact' }
        ])
    ]
})
export class AppModuleShared {
}
