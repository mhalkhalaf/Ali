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
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subscription } from 'rxjs';
import { Owner } from '../../models/General/Owner/owner';
import { Coordibator } from '../../models/General/Owner/coordibator';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { CoordibatorService } from '../../services/coordibator.service';
import { OwnerService } from '../../services/owner.service';



@Component({
  selector: 'fn-coordibator',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule,
    InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule,
    FormsModule, InputNumberModule, TranslateModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './coordibator.component.html',
  styleUrl: './coordibator.component.css'
})
export class CoordibatorComponent implements OnInit {
  Owner$!: Subscription;
  form!: FormGroup;
  coordibatorDialog: boolean = false;
  coordibators!: Coordibator[];
  coordibator!: Coordibator;
  selectedCoordibators!: Coordibator[] | null;
  owner!: Owner;
  owners!: Owner[]

  constructor(private coordibatorService: CoordibatorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public authService : AuthService,
    private ownerService : OwnerService
  ) {

  }




  ngOnInit() {
    this.coordibatorService.getCoordibators().subscribe((data) => (this.coordibators = data));
    this.Owner$ = this.ownerService.getOwners().subscribe(value => {
      this.owners = value;
    })
  }

  openNew() {
    this.coordibator = { name: "", id: "" };
    this.coordibatorDialog = true;
  }


  editCoordibator(coordibator: Coordibator) {
    this.coordibator = { ...coordibator };
    this.coordibatorDialog = true;
  }

  deleteCoordibator(coordibator: Coordibator) {
    this.coordibator = { ...coordibator };
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + coordibator.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.coordibatorService.deleteCoordibator(this.coordibator.id).subscribe(
          value => {
            console.log(value);
            this.hideDialog()
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coordibator Deleted', life: 3000 });
          },
        )
      }
    });
  }

  hideDialog() {
    this.coordibatorDialog = false;
    this.coordibatorService.getCoordibators().subscribe((data) => (this.coordibators = data));

  }

  saveCoordibator() {
      if (this.coordibator.id) {
        this.coordibator.ownerId = this.owner.id
        console.log(this.coordibator)
        this.coordibatorService.updateCoordibator(this.coordibator, this.coordibator.id).subscribe(value => {
          console.log(value)
          console.log(this.coordibator.owner)
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coordibator Updated', life: 3000 });
        })
      }
      else {
        this.coordibator.name = this.coordibator.name;
        this.coordibator.ownerId = this.owner.id
        this.coordibatorService.addCoordibator(this.coordibator).subscribe(value => {
          console.log(value);
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coordibator Added', life: 3000 });
        })
      }
    }
}





















