import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  users:any;
rmdp:string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    if(localStorage.length<1)
    {
      window.location.replace("");
    }
    this.user=new User();

this.user.id=localStorage.getItem("id");
this.user.nom=localStorage.getItem("nom");
this.user.rib=localStorage.getItem("rib");
this.user.email=localStorage.getItem("email");
this.user.mdp=localStorage.getItem("mdp");
this.user.description=localStorage.getItem("description");
this.user.activite=localStorage.getItem("activite");
this.user.role=localStorage.getItem("role");
this.user.adresse=localStorage.getItem("adresse");
this.user.telephone=localStorage.getItem("telephone");


}

    up()
    {
      let us=Object.assign({},this.user);
      this.userService.update_User(this.user.id,us);
    }
}
