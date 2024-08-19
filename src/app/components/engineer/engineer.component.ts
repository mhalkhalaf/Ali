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
import { Engineer } from '../../models/General/Owner/engineer';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { EngineerService } from '../../services/engineer.service';



@Component({
  selector: 'fn-engineer',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule,
    InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule,
    FormsModule, InputNumberModule, TranslateModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './engineer.component.html',
  styleUrl: './engineer.component.css'
})
export class EngineerComponent implements OnInit {
  Owner$!: Subscription;
  form!: FormGroup;
  engineerDialog: boolean = false;
  engineers!: Engineer[];
  engineer!: Engineer;
  selectedEngineers!: Engineer[] | null;
  statuses!: any[];

  constructor(private engineerService: EngineerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public authService : AuthService
  ) {
  }




  ngOnInit() {
    this.engineerService.getEngineers().subscribe((data) => (this.engineers = data));
  }

  openNew() {
    this.engineer = { name: "", id: "" };
    this.engineerDialog = true;
  }


  editEngineer(engineer: Engineer) {
    this.engineer = { ...engineer };
    this.engineerDialog = true;
  }

  deleteEngineer(engineer: Engineer) {
    this.engineer = { ...engineer };
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + engineer.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.engineerService.deleteEngineer(this.engineer.id).subscribe(
          value => {
            console.log(value);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Engineer Deleted', life: 3000 });
            this.hideDialog()
          },
        )
      }
    });
  }

  hideDialog() {
    this.engineerDialog = false;
    this.engineerService.getEngineers().subscribe((data) => (this.engineers = data));
  }

  saveEngineer() {
    if (this.engineer.name?.trim()) {
      if (this.engineer.id) {
        console.log(this.engineer)
        this.engineerService.updateEngineer(this.engineer, this.engineer.id).subscribe(value => {
          console.log(value)
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Engineer Updated', life: 3000 });
        })
      }
      else {
        this.engineer.name = this.engineer.name;
        this.engineerService.addEngineer(this.engineer).subscribe(value => {
          console.log(value);
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Engineer Added', life: 3000 });
        })
      }
    }
  }
}





















