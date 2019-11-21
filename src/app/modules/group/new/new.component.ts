import { Component, OnInit} from '@angular/core';
import { DestroyUtils } from '../../../utils/DestroyUtils';
import { GroupService } from '../../../service/group.service';
import { ErrorHandlerService } from '../../../service/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../../../model/group';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent extends DestroyUtils implements OnInit {

  isEditing:boolean = false;
  isSaving:boolean = false;

  groupId:number = null;

  group:Group = new Group();

  constructor(public groupService:GroupService,
              public errroHandlerService:ErrorHandlerService,
              private route: ActivatedRoute,
              private router:Router) { 
     super();
  }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(
      params=>{
        if (params.id) {
          this.isEditing = true;
          this.groupId = params.id;
          this.loadGroup();
        }
      }
    );
  }

  loadGroup() {
    this.subscription = this.groupService.get(this.groupId).subscribe(
      data=> {
        this.group = data;
      },
      error=>{
        this.errroHandlerService.handle(error);
      }
    );
  }

  save() {
    if (!this.group.name || this.group.name == "") {
      //toast
      alert("Informe o nome do grupo");
      return;
    }

    if (this.isEditing) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    this.subscription = this.groupService.update(this.group).subscribe(
      data=> {
        this.group = data;
        this.cancel();
      },
      error=>{
        this.errroHandlerService.handle(error);
        this.isSaving = false;
      }
    );
  }

  create() {
    this.subscription = this.groupService.create(this.group).subscribe(
      data=> {
        this.group = data;
        this.cancel();
      },
      error=>{
        this.errroHandlerService.handle(error);
        this.isSaving = false;
      }
    );
  }

  cancel() {    
    this.router.navigate(["/group"]);
  }

}
