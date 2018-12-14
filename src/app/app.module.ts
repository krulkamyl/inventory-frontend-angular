import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomerListComponent} from './components/customer/customer-list/customer-list.component';
import {RouterModule, Routes} from '@angular/router';
import {CustomerService} from './service/customer.service';
import {HttpClientModule} from '@angular/common/http';
import {CustomerNewComponent} from './components/customer/customer-new/customer-new.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomerEditComponent} from './components/customer/customer-edit/customer-edit.component';
import {ParameterListComponent} from './components/parameter/parameter-list/parameter-list.component';
import {ParamService} from './service/param.service';
import {ParameterNewComponent} from './components/parameter/parameter-new/parameter-new.component';
import {ParameterEditComponent} from './components/parameter/parameter-edit/parameter-edit.component';
import {MaterialModule} from './material.module';
import {ProductService} from './service/product.service';
import {ProductListComponent} from './components/product/product-list/product-list.component';
import {ProductNewComponent} from './components/product/product-new/product-new.component';
import {ProductEditComponent} from './components/product/product-edit/product-edit.component';
import {RentNewComponent} from './components/rent/rent-new/rent-new.component';
import {RentService} from './service/rent.service';
import {DatePipe} from '@angular/common';
import {RentListComponent} from './components/rent/rent-list/rent-list.component';
import {RentEditComponent} from './components/rent/rent-edit/rent-edit.component';
import {ProductHistoryComponent} from './components/product/product-history/product-history.component';


const appRoutes: Routes = [
    {path: 'customers', component: CustomerListComponent},
    {path: 'customers/edit/:id', component: CustomerEditComponent},
    {path: 'customers/new', component: CustomerNewComponent},
    {path: 'parameters', component: ParameterListComponent},
    {path: 'parameters/new', component: ParameterNewComponent},
    {path: 'parameters/edit/:id', component: ParameterEditComponent},
    {path: 'products/new', component: ProductNewComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'products/edit/:id', component: ProductEditComponent},
    {path: 'products/history/:id', component: ProductHistoryComponent},
    {path: 'rents/new', component: RentNewComponent},
    {path: 'rents', component: RentListComponent},
    {path: 'rents/edit/:id', component: RentEditComponent},
];

@NgModule({
    declarations: [
        AppComponent,

        CustomerListComponent,
        CustomerNewComponent,
        CustomerEditComponent,

        ParameterListComponent,
        ParameterNewComponent,
        ParameterEditComponent,

        ProductNewComponent,
        ProductListComponent,
        ProductEditComponent,
        ProductHistoryComponent,

        RentNewComponent,
        RentListComponent,
        RentEditComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forRoot(
            appRoutes, {
                enableTracing: false
            }
        )
    ],
    providers: [
        CustomerService,
        ParamService,
        ProductService,
        RentService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
