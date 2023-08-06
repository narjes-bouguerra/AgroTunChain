import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Commandes } from '../classes/commandes';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  commande: Commandes;
  id = '';
  grade = '';
  commandes: Commandes[];
  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commande = new Commandes();
    this.getCommandes();
    this.grade = localStorage.getItem('role');
    this.id = localStorage.getItem('id');
  }
  getCommandes() {
    this.commandeService.read_Commandes().subscribe((data) => {
      this.commandes = data.map((e) => {
        return {
          id: e.payload.doc.id,

          // tslint:disable-next-line: no-string-literal
          titre: e.payload.doc.data()['titre'],
          // tslint:disable-next-line: no-string-literal
          nom_cl: e.payload.doc.data()['nom_cl'],
          // tslint:disable-next-line: no-string-literal
          etat: e.payload.doc.data()['etat'],

          // tslint:disable-next-line: no-string-literal
          quantite: e.payload.doc.data()['quantite'],
          prix: e.payload.doc.data()['prix'],
          vendeur: e.payload.doc.data()['vendeur'],
          id_client: e.payload.doc.data()['id_client'],
          id_prod: e.payload.doc.data()['id_prod'],

          // tslint:disable-next-line: no-string-literal
          date: e.payload.doc.data()['date'],
          // tslint:disable-next-line: no-string-literal
        };
      });
      console.log(this.commandes);
    });
  }
  annuler(us) {
    if (confirm('êtes vous sûre de vouloir annuler? ')) {
      this.commande = us;
      us.etat = 'annuler';
      let cm = Object.assign({}, us);
      this.commandeService.update_Commande(us.id, cm);
    }
  }
  valider(us) {
    this.commande = us;
    us.etat = 'vendu';
    let cm = Object.assign({}, us);
    this.commandeService.update_Commande(us.id, cm);
  }
  emballer(us) {
    this.commande = us;
    us.etat = us.etat + ' ' + 'emballé';
    let cm = Object.assign({}, us);
    this.commandeService.update_Commande(us.id, cm);
  }
  stocker(us) {
    this.commande = us;
    us.etat = us.etat + ' ' + 'en stock';
    let cm = Object.assign({}, us);
    this.commandeService.update_Commande(us.id, cm);
  }
}
