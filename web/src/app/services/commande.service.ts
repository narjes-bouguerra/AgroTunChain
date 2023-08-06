import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  id: string;
  constructor(private firestore: AngularFirestore) {}

  create_NewCommande(record) {
    this.id = localStorage.getItem('id');
    return this.firestore.collection('Commandes/').add(record);
  }

  read_Commandes() {
    this.id = localStorage.getItem('id');

    return this.firestore.collection('Commandes/').snapshotChanges();
  }

  update_Commande(recordID, record) {
    this.firestore.doc('Commandes/' + recordID).update(record);
    console.log('updated');
  }

  delete_Commande(record_id) {
    this.id = localStorage.getItem('id');

    this.firestore.doc('Commandes/' + record_id).delete();
  }
}
