import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  user: User;
  users: any;
connected = false;

  constructor( private userService: UserService) { }

  ngOnInit() {
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
  add()
  {
    this.user.role="agriculteur";
    let us=Object.assign({},this.user);
    this.userService.create_NewUser(us).then(resp=>{
      console.log(resp)
      alert("ajouté avec succés");
    this.user=new User();
}
    ).catch(error=>{console.log(error);
    }
    )

  }
  delete(id): void {
    if (confirm('êtes vous sûre de vouloir supprimer?')) {
    this.userService.delete_User(id);
    //window.location.replace('gestion');
    }
  }
}
