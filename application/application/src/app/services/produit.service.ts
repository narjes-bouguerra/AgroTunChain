import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Produitservice {
id:string;
  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewProduit(record) {
   this.id=localStorage.getItem("id");
    return this.firestore.collection('Users/'+this.id+'/Produits/').add(record);
  }

  read_Produits() {
   this.id=localStorage.getItem("id");

    return this.firestore.collection('Users/'+this.id+'/Produits/').snapshotChanges();
  }

  update_Produit(recordID, record) {
    this.firestore.doc('Users/'+this.id+'/Produits/' + recordID).update(record);
    console.log('updated');
  }

  delete_Produit(record_id) {
   this.id=localStorage.getItem("id");

    this.firestore.doc('Users/'+this.id+'/Produits/' + record_id).delete();
  }
}
