import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { GestionComponent } from './gestion/gestion.component';
import { ProduitsComponent } from './produits/produits.component';

const routes: Routes = [
  {path:'', component :ConnexionComponent},
  {path:'profile', component :ProfileComponent},
  {path:'message', component :MessageComponent},
  {path:'inscription', component :InscriptionComponent},
  {path:'gestion', component :GestionComponent},
  {path:'produit', component :ProduitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
