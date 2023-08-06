import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
user:User;
rmdp:string;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user=new User();
  }
  add()
  {
    let us=Object.assign({},this.user);
    this.userService.create_NewUser(us).then(resp=>{
      console.log(resp)
      alert("ajouté avec succés");
    this.user=new User();
    window.location.replace("");
}
    ).catch(error=>{console.log(error);
    }
    )

  }

}
