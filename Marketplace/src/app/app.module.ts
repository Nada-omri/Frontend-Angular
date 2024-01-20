import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { CounterComponent } from './counter/counter.component';
import { BestsellersComponent } from './bestsellers/bestsellers.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { OwnersComponent } from './owners/owners.component';
import { SearchComponent } from './search/search.component';
import { ProduitsComponent } from './produits/produits.component';

import { ReactiveFormsModule } from '@angular/forms';
import { produitService } from './produits/produit.Service';
import { HttpClientModule , HTTP_INTERCEPTORS  } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { StoreComponent } from './store/store.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AngularMaterialModule } from './shared/prime-ng.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CategoryService } from './services/category/category.service';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { OrdersComponent } from './orders/orders.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { RxStompService } from './services/rx-stomp.service';
import { rxStompServiceFactory } from './services/rx-stomp-service-factory';
import { MessagesComponent } from './messages/messages.component';
import { SendComponent } from './send/send.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BrandService } from './services/brand/brand.service';
import { OrderService } from './services/order.service';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    CounterComponent,
    BestsellersComponent,
    HomepageComponent,
    FooterComponent,
    CarouselComponent,
    PartenaireComponent,
    OwnersComponent,
    SearchComponent,
    ProduitsComponent,
    SignupComponent,
    SigninComponent,
    StoreComponent,
    SearchbarComponent,
    SearchproductComponent,
    ProductPageComponent,
    ShoppingCardComponent,
    OrdersComponent,
    SpinnerComponent,
    NotFoundComponent,
    MessagesComponent,
    SendComponent,
    ConfirmationDialogComponent,
    ChatComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  
    
  ],

    

  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
   
    produitService,
    CategoryService,
    BrandService,
    OrderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

