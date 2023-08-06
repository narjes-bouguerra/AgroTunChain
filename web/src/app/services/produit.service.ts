import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Produitservice {
  id: string;
  constructor(private firestore: AngularFirestore) {}

  create_NewProduit(record) {
    this.id = localStorage.getItem('id');
    return this.firestore.collection('Produits/').add(record);
  }

  read_Produits() {
    this.id = localStorage.getItem('id');

    return this.firestore.collection('Produits/').snapshotChanges();
  }

  update_Produit(recordID, record) {
    this.firestore.doc('Produits/' + recordID).update(record);
    console.log('updated');
  }

  delete_Produit(record_id) {
    this.id = localStorage.getItem('id');

    this.firestore.doc('Produits/' + record_id).delete();
  }
}
