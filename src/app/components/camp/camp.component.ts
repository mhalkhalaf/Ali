import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { Camp } from '../../models/General/Place/camp';
import { Locations } from '../../models/General/Place/location';
import { CampService } from '../../services/camp.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'fn-camp',
  standalone: true,
  imports:[TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule,
    InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule,
    FormsModule, InputNumberModule, TranslateModule ],
providers: [MessageService, ConfirmationService],
  templateUrl: './camp.component.html',
  styleUrl: './camp.component.css'
})
export class CampComponent implements OnInit{
  form!: FormGroup;
  campDialog: boolean = false;
  camps!: Camp[];
  camp!: Camp;
  selectedCamps!: Camp[] | null;
  statuses!: any[];
  Location$! : Subscription
  Locations! : Locations[]
  selectedCountry!: Locations;
  constructor(private campService: CampService, 
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    public authService : AuthService
  ) {
    
  }



  
  ngOnInit() {
      this.campService.getCamps().subscribe((data) => (this.camps = data));
      this.Location$! = this.campService.Locations$.subscribe(locations => {
        this.Locations = locations
      })

  }

   openNew() {
      this.camp ={ name:"",locationId:"",id:"",latityde: 0, longityde: 0};
      this.campDialog = true;
  }
  
  editCamp(camp: Camp) {
      this.camp = { ...camp };
      this.campDialog = true;
  }

  deleteCamp(camp: Camp) {
      this.camp = { ...camp };
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + camp.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.campService.deleteCamp(this.camp.id).subscribe(
            value => {
              console.log(value);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Camp Deleted', life: 3000 });
              this.hideDialog()
            },
          )
          }
      });
  }

  hideDialog() {
      this.campDialog = false;
      this.campService.getCamps().subscribe((data) => (this.camps = data));
    }

  saveCamp() {
          if (this.camp.id) {
              this.camp.locationId = this.selectedCountry.id
              console.log(this.selectedCountry)
              console.log(this.camp)
              this.campService.updateCamp(this.camp,this.camp.id).subscribe(value => {
                console.log(value);
                this.hideDialog()
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Camp Updated', life: 3000 });
              })
          } 
          else {
           this.camp.name = this.camp.name;
           this.camp.locationId = this.selectedCountry.id

           this.campService.addCamp(this.camp).subscribe(value => {
            console.log(value);
            this.hideDialog()
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Camp Added', life: 3000 });
          })
      }
  }
}  
