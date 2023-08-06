import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
user: User;
  users: any;
connected = false;

  constructor( private userService: UserService) { }

  ngOnInit() {
    localStorage.clear();
    this.user = new User();
    this.getUsers();  }
  getUsers() {
    this.userService.read_Users().subscribe(data => {

      this.users = data.map(e => {
        return {
         id: e.payload.doc.id,

         // tslint:disable-next-line: no-string-literal
         nom: e.payload.doc.data()['nom'],
         // tslint:disable-next-line: no-string-literal
         adresse: e.payload.doc.data()['adresse'],
         // tslint:disable-next-line: no-string-literal
         activite: e.payload.doc.data()['activite'],
         // tslint:disable-next-line: no-string-literal
         role: e.payload.doc.data()['role'],
         // tslint:disable-next-line: no-string-literal
         description: e.payload.doc.data()['description'],

         // tslint:disable-next-line: no-string-literal
         email: e.payload.doc.data()['email'],
         // tslint:disable-next-line: no-string-literal
         mdp: e.payload.doc.data()['mdp'],
         // tslint:disable-next-line: no-string-literal
         age: e.payload.doc.data()['age'],
         // tslint:disable-next-line: no-string-literal
         telephone: e.payload.doc.data()['telephone'],


        };
      });
      console.log(this.users);

    });
  }
 connect()
 {

  for (const us of this.users) {
    if ((this.user.email === us.email) && (this.user.mdp === us.mdp)) {
    //  alert('ok');
    this.connected = true;
    localStorage.setItem('etat', 'accepte');
    localStorage.setItem('nom', us.nom);
    localStorage.setItem('adresse', us.adresse);
    localStorage.setItem('email', us.email);
    localStorage.setItem('mdp', us.mdp);
    localStorage.setItem('telephone', us.telephone);
    localStorage.setItem('role', us.role);
    localStorage.setItem('description', us.description);
    localStorage.setItem('activite', us.activite);
    localStorage.setItem('rib', us.rib);
    localStorage.setItem('id', us.id);

    window.location.replace('profile');

    }
  }



  if (!this.connected)
 {
   alert('compte inconnu');
 }
}
}
