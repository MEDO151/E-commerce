import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';

const routes: Routes = [
  {path:'' , canActivate:[authGuard] , component:BlankLayoutComponent , children: [
    {path:"home" , component: HomeComponent , title: "Home"},
    {path:"cart" , component: CartComponent , title: "Cart"},
    {path:"wishlist" , component: WishlistComponent , title: "wishlist"},
    {path:"details/:id" , component: DetailsComponent , title: "Details"},
    {path:"products" , component: ProductsComponent , title: "Products"},
    {path:"payment/:id" , component: PaymentComponent , title: "Payment"},
    {path:"allorders" , component: AllordersComponent , title: "All Orders"},
    {path:"categories" , component:CategoriesComponent , title: "Categoriese"},
    {path:"brands" , component: BrandsComponent , title: "Brands"}
  ]},
  {path:"" , component: AuthLayoutComponent , children: [
    {path:"login" , component: LoginComponent , title: "Login"},
    {path:"forget-password" , component: ForgetPasswordComponent , title: "Forget-Password"},
    {path:"verify-code" , component: VerifyCodeComponent , title: "Verify-Code"},
    {path:"reset-password" , component: ResetPasswordComponent , title: "Reset-Password"},
    {path:"register" , component: RegisterComponent , title: "Register"},
    {path:"**" , component:NotFoundComponent, title: "NotFound"}
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
