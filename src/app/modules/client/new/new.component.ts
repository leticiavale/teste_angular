import { Component, OnInit} from '@angular/core';
import { DestroyUtils } from '../../../utils/DestroyUtils';
import { ClientService } from '../../../service/client.service';
import { GroupService } from '../../../service/group.service';
import { ErrorHandlerService } from '../../../service/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../model/client';
import { Phone } from '../../../model/phone';
import { ClientType } from '../../../utils/enum/client-type';
import { Group } from '../../../model/group';
import { ColClassService } from 'src/app/utils/col-class.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent extends DestroyUtils implements OnInit {

  isEditing:boolean = false;
  isSaving:boolean = false;

  clientId:number = null;

  client:Client = new Client();
  groups:Group[] = [];
  phone:Phone = new Phone();

  constructor(public clientService:ClientService,
              public groupService:GroupService,
              public errroHandlerService:ErrorHandlerService,
              private route: ActivatedRoute,
              private router:Router,
              private col:ColClassService) { 
     super();
  }

  ngOnInit() {
    this.client.type = ClientType.FISICAL;
    this.loadGroups();

    this.subscription = this.route.params.subscribe(
      params=>{
        if (params.id) {
          this.isEditing = true;
          this.clientId = params.id;
          this.loadClient();
        }
      }
    );
  }

  loadClient() {
    this.subscription = this.clientService.get(this.clientId).subscribe(
      data=> {
        this.client = data;
      },
      error=>{
        this.errroHandlerService.handle(error);
      }
    );
  }

  loadGroups() {
    this.subscription = this.groupService.getAll().subscribe(
      data=>{
        this.groups = data.content;
      },
      error=>{
        this.errroHandlerService.handle(error);
      }
    );
  }

  save() {
    if (!this.client.name || this.client.name == "") {
      //toast
      alert("Informe o nome do cliente");
      return;
    }

    if (!this.client.cpg || this.client.cpg == "") {
      //toast
      alert("Informe o "+(this.client.type == ClientType.FISICAL?"CPF":"CNPJ")+" do cliente");
      return;
    }

    if (!this.client.group || !this.client.group.id || this.client.group.id == 0) {
      //toast
      alert("Selecione um grupo");
      return;
    }

    if (this.isEditing) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    this.subscription = this.clientService.update(this.client).subscribe(
      data=> {
        this.client = data;
        this.cancel();
      },
      error=>{
        this.errroHandlerService.handle(error);
        this.isSaving = false;
      }
    );
  }

  create() {
    this.subscription = this.clientService.create(this.client).subscribe(
      data=> {
        this.client = data;
        this.cancel();
      },
      error=>{
        this.errroHandlerService.handle(error);
        this.isSaving = false;
      }
    );
  }

  cancel() {    
    this.router.navigate(["/client"]);
  }

  addPhone() {
    if (!this.phone.phoneNumber || this.phone.phoneNumber=="") {
      return;
    }

    this.client.phones.push(this.phone);
    this.phone = new Phone();
  }

  deletePhone(phone:Phone) {
    if (!phone) {
      return;
    }

    this.client.phones.splice(this.client.phones.indexOf(phone),1);
  }

}
