import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Produitservice } from '../services/produit.service';
import { Produit } from '../classes/produit';
import { CommandeService } from '../services/commande.service';
import { Commande } from '../classes/commande';
import { Commandes } from '../classes/commandes';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  title = 'cloudsSorage';
  selectedFile: File = null;
  fb = '';
  id = '';
  grade = '';
  commander: Commandes;
  produits: any;
  produit: Produit;
  downloadURL: Observable<string>;
  constructor(
    private Api: Produitservice,
    private storage: AngularFireStorage,
    private cmd: CommandeService
  ) {}
  ngOnInit() {
    this.commander = new Commandes();
    this.grade = localStorage.getItem('role');
    this.produit = new Produit();
    this.produit.quantite = 10;
    this.commander.quantite = 1;
    this.produit.id_vd = localStorage.getItem('id');
    this.produit.vendeur = localStorage.getItem('nom') + ' ';
    this.id = localStorage.getItem('id');
    this.getproduits();
  }
  commande(us) {
    //alert('rien');
    this.commander.date = Date.now().toString();
    this.commander.id_prod = us.id;
    this.commander.etat = 'en cours';
    this.commander.id_client = this.id;
    this.commander.nom_cl = this.produit.vendeur;
    this.commander.vendeur = us.vendeur;
    this.commander.titre = us.titre;
    this.commander.prix = us.prix;
    let cm = Object.assign({}, this.commander);
    this.cmd.create_NewCommande(cm);
    alert('commande validé');
    us.quantite -= this.commander.quantite;
    let pr = Object.assign({}, us);
    this.Api.update_Produit(us.id, pr);

    window.location.reload();
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Produits/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Produits/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }
  add() {
    this.produit.photo = this.fb;
    let pr = Object.assign({}, this.produit);
    this.Api.create_NewProduit(pr);
    alert('ajouté avec succés');
    this.produit = new Produit();
    // window.location.reload();
  }
  getproduits() {
    this.Api.read_Produits().subscribe((data) => {
      this.produits = data.map((e) => {
        return {
          id: e.payload.doc.id,

          // tslint:disable-next-line: no-string-literal
          titre: e.payload.doc.data()['titre'],
          // tslint:disable-next-line: no-string-literal
          prix: e.payload.doc.data()['prix'],
          // tslint:disable-next-line: no-string-literal
          quantite: e.payload.doc.data()['quantite'],

          // tslint:disable-next-line: no-string-literal
          description: e.payload.doc.data()['description'],
          vendeur: e.payload.doc.data()['vendeur'],

          // tslint:disable-next-line: no-string-literal
          photo: e.payload.doc.data()['photo'],
          // tslint:disable-next-line: no-string-literal
        };
      });
      console.log(this.produits);
    });
  }
  delete(id): void {
    if (confirm('êtes vous sûre de vouloir supprimer?')) {
      this.Api.delete_Produit(id);
      //window.location.replace('gestion');
    }
  }
}
