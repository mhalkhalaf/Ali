import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IAcoount } from '../../models/Account/account';
import { AccountService } from '../../services/account.service';



@Component({
  selector: 'fn-account-details',
  standalone: true,
  imports: [MatPaginator, FormsModule, InputGroupModule, InputGroupAddonModule,
    InputTextModule, TagModule, DropdownModule, SplitButtonModule, ToastModule
    , MatSortModule, MatTableModule, TableModule, ReactiveFormsModule, 
    CommonModule,ConfirmDialogModule,DialogModule,
    TranslateModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
  providers: [MessageService,ConfirmationService]
})

export class AccountDetailsComponent implements OnInit {

  statuses!: any[];
  account!: IAcoount
  accounts!: IAcoount[]
  Account$!: Subscription
  form!: FormGroup;

  constructor(private accountService: AccountService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tranlate : TranslateService) { }
  ngOnInit(): void {
    this.Account$ = this.accountService.getAccounts().subscribe(value => (this.accounts = value));
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      role: new FormControl()
    })
    
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],
    });
    this.statuses = ['Administrator', 'Contractors', 'Engineers', 'Projects', 'User']
  }

  Save() {
    if(this.account!){
      if (this.account.username?.trim()) {
        if (this.account.id) {
          console.log(this.account)
          this.account.id = this.account.id
          this.account.username = this.form.get("username")?.value
          this.account.password = this.form.get("password")?.value
          this.account.role = this.form.get("role")?.value
          this.accountService.updateAccount(this.account.id, this.account).subscribe(value => {
            console.log(value)
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coordibator Updated', life: 3000 });
          })
          this.Account$ = this.accountService.getAccounts().subscribe(value => (this.accounts = value));
        }
    }
  }
  else {
    this.accountService.addAccount(this.form.value).subscribe(value => {
      console.log(value);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coordibator Added', life: 3000 });
    })
  }
}
  Edit(account: IAcoount) {
    this.account = { ...account }
    this.form.setValue({
      username: account.username,
      password: account.password,
      role: account.role
    })
  }

  Delete(account: IAcoount) {
    this.account = { ...account }
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + account.username + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.deleteAccount(this.account.id).subscribe(
          value => {
            console.log(value);
            this.messageService.add({ severity: 'danger', summary: 'Successful', detail: 'Coordibator Deleted', life: 3000 });
          },
        )
        this.Account$ = this.accountService.getAccounts().subscribe(value => (this.accounts = value));
      }
    });
  }















  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'Administrator':
  //       return 'success';
  //     case 'Contractors':
  //       return 'warning';
  //     case 'Engineers':
  //       return 'warning';
  //     case 'Projects':
  //       return 'warning';
  //     case 'User':
  //       return 'danger';
  //     default:
  //       return
  //   }
  // }
}