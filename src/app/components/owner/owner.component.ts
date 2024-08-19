import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormGroup, FormsModule ,Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Owner } from '../../models/General/Owner/owner';
import { OwnerService } from '../../services/owner.service';
import { Coordibator } from '../../models/General/Owner/coordibator';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';

   

@Component({
  selector: 'fn-owner',
  standalone: true,
imports:[TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule,
        InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule,
        FormsModule, InputNumberModule,TranslateModule ],
providers: [MessageService, ConfirmationService],
templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent implements OnInit,OnDestroy {

  coordibator$! :Subscription;
  owner$! : Subscription
  form!: FormGroup;
  ownerDialog: boolean = false;
  owners!: Owner[];
  owner!: Owner;
  selectedOwners!: Owner[];
  coordibator! :Coordibator;
  coordibators!: Coordibator[] 

  constructor(private ownerService: OwnerService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    public authService : AuthService
  ) {
  }
 



  
  ngOnInit() {
  this.owner$ = this.ownerService.getOwners().subscribe((data) => (this.owners = data));
  this.coordibator$ = this.ownerService.getCoordibators().subscribe(
    value => {
      this.coordibators = value;
    })
  }

  openNew() {
    this.owner ={ name:"",id:""};
    this.ownerDialog = true;
}

editOwner(owner: Owner) {
    this.owner = {...owner};
    this.ownerDialog = true;
}

deleteOwner(owner: Owner) {
    this.owner = { ...owner };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + owner.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.ownerService.deleteOwner(this.owner.id).subscribe(
          value => {
            console.log(value);
            this.hideDialog()
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Owner Deleted', life: 3000 });
          },
        )
        }
    });
}

hideDialog() {
    this.ownerDialog = false;
    this.owner$ = this.ownerService.getOwners().subscribe((data) => (this.owners = data));
}

saveOwner() {
        if (this.owner.id) {
          this.owner.coordibators = [this.coordibator]
          console.log(this.owner)
            this.ownerService.updateOwner(this.owner,this.owner.id).subscribe(value => {
              console.log(value)
              this.hideDialog()
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Owner Updated', life: 3000 });
            })
        } 
        else {
         this.owner.name = this.owner.name;
         this.ownerService.addOwner(this.owner).subscribe(value => {
          console.log(value);
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Owner Added', life: 3000 });
        })
        }
}

ngOnDestroy(): void {
if(this.owner$ || this.coordibator$) {
  this.coordibator$.unsubscribe
  this.owner$.unsubscribe
}
}
}





















