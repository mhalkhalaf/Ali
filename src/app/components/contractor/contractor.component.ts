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
import { TranslateModule } from '@ngx-translate/core';
import { Contractor } from '../../models/General/Owner/contractor';
import { Owner } from '../../models/General/Owner/owner';
import { ContractorService } from '../../services/contractor.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'fn-contractor',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule,
    InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule,
    FormsModule, InputNumberModule, TranslateModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './contractor.component.html',
  styleUrl: './contractor.component.css'
})
export class ContractorComponent implements OnInit {
  Owner$!: Subscription;
  form!: FormGroup;
  contractorDialog: boolean = false;
  contractors!: Contractor[];
  contractor!: Contractor;
  selectedContractors!: Contractor[] | null;
  statuses!: any[];
  owner!: Owner;
  owners!: Owner[]

  constructor(private contractorService: ContractorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public authService : AuthService
  ) {
  }




  ngOnInit() {
    this.contractorService.getContractors().subscribe((data) => (this.contractors = data));
  }

  openNew() {
    this.contractor = { name: "", id: "" };
    this.contractorDialog = true;
  }


  editContractor(contractor: Contractor) {
    this.contractor = { ...contractor };
    this.contractorDialog = true;
  }

  deleteContractor(contractor: Contractor) {
    this.contractor = { ...contractor };
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + contractor.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contractorService.deleteContractor(this.contractor.id).subscribe(
          value => {
            console.log(value);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contractor Deleted', life: 3000 });
            this.hideDialog()
          },
        )
      }
    });
  }

  hideDialog() {
    this.contractorDialog = false;
    this.contractorService.getContractors().subscribe((data) => (this.contractors = data));

  }

  saveContractor() {
    if (this.contractor.name?.trim()) {
      if (this.contractor.id) {
        console.log(this.contractor)
        this.contractorService.updateContractor(this.contractor, this.contractor.id).subscribe(value => {
          console.log(value)
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contractor Updated', life: 3000 });
        })
      }
      else {
        this.contractor.name = this.contractor.name;
        this.contractorService.addContractor(this.contractor).subscribe(value => {
          console.log(value);
          this.hideDialog()
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contractor Added', life: 3000 });
        })
      }
    }
  }
}





















