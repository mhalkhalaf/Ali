
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProjectService } from '../../services/project-service';
import { ProjectDetail } from '../../models/project-detail';
import { TranslateModule } from '@ngx-translate/core';
import { CampService } from '../../services/camp.service';
import { Camp } from '../../models/General/Place/camp';
import { Owner } from '../../models/General/Owner/owner';
import { OwnerService } from '../../services/owner.service';
import { TypeP } from '../../models/General/Type/typeP';
import { ContractorService } from '../../services/contractor.service';
import { Contractor } from '../../models/General/Owner/contractor';
import { AuthService } from '../../services/auth.service';
import { EMPTY, EmptyError, Subscription, map } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Engineer } from '../../models/General/Owner/engineer';


@Component({
  selector: 'fn-project-detials',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule,
     InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule,
      FormsModule, InputNumberModule , TranslateModule,RouterModule ],
      providers: [MessageService, ConfirmationService],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  projectDetialDialog: boolean = false;
  projectDetials!: ProjectDetail[];
  projectDetial!: ProjectDetail;
  engineer! : Engineer
  selectedProjectDetails!: ProjectDetail[] | null;
  years : number[] = []
  statuses!: any[];
  date : Date = new Date();

  //  الإشتراكات
  Project$! : Subscription
  Camp$! : Subscription
  Owner$! : Subscription
  Type$! : Subscription
  Contractor$! : Subscription
// النعرفات
  campId! : string
  ownerId! : string
  contractorId! : string
  typeId! :string
// القوائم
  camps! : Camp[]
  owners! : Owner[]
  contractors! : Contractor[]
  types! : TypeP []
  constructor(private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private campService : CampService,
    private ownerService : OwnerService,
    private contractorService : ContractorService,
    public authService : AuthService) {
  
    
  for (let year = 2022; year <= this.date.getFullYear(); year++) {
    this.years.push(year)
  }
  console.log(this.years);
  
    }

 

  ngOnInit() {
     this.Project$ = this.projectService.getProjectDetails().subscribe(
        (data) =>
             (this.projectDetials = data));
     this.Camp$ = this.campService.getCamps().subscribe((data) => this.camps = data );
     this.Owner$ = this.ownerService.getOwners().subscribe((data) => this.owners = data);
      this.Type$ = this.projectService.Type$.subscribe((data) => this.types = data )
     this.Contractor$ = this.contractorService.getContractors().subscribe((data) => this.contractors = data)
      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  openNew() {
      this.projectDetial = {id : ""};
      this.projectDetialDialog = true;
  }

  editProjectDetail(projectDetial: ProjectDetail) {
    this.projectDetial = { ...projectDetial};
    this.projectDetial.startDate
     this.campId= this.projectDetial.projectCamps?.map(pc => pc.campId).toString() as string
     this.ownerId = this.projectDetial.ownerId as string
     this.typeId = this.projectDetial.typeId as string

      this.projectDetialDialog = true;
  }

  deleteProjectDetail(projectDetial: ProjectDetail) {
    this.projectDetial = {...projectDetial}
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + projectDetial.projectName + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.projectService.deleteProjectDetail(this.projectDetial.id).subscribe(
                value => {
                  console.log(value);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Camp Deleted', life: 3000 });
                  this.hideDialog()
                },
      )}
      });
  }

  hideDialog() {
      this.projectDetialDialog = false;
      this.Project$ = this.projectService.getProjectDetails().subscribe(
        (data) =>
             (this.projectDetials = data));
}

  saveProjectDetail() {
          if (this.projectDetial.id) {
            this.campId= this.campId
            this.projectService.updateProjectDetail(this.projectDetial, this.projectDetial.id,this.campId,this.typeId,this.ownerId).subscribe(value => {
                console.log(value)
                console.log(this.projectDetial.projectCamps)
                this.hideDialog()
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coordibator Updated', life: 3000 });
              })
          } else {
            this.projectService.addProjectDetail(this.projectDetial,this.campId,this.typeId,this.ownerId).subscribe(value => {
                console.log(value);
                this.hideDialog()
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Camp Added', life: 3000 });
              })
          }

          this.projectDetials = [...this.projectDetials];
          this.projectDetialDialog = false;
  }

  updateProject(){
    this.projectService.updatePatch(this.projectDetial.id,this.contractorId).subscribe(value => {
        console.log(value)
        console.log(this.projectDetial.projectCamps)
        this.hideDialog()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Coordibator Updated', life: 3000 });
      })
  } 


  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
          default:
            return 
      }
  }

  GetYear(year : number){
    this.projectService.GetYearOrType(year,"").subscribe(data => this.projectDetials = data)
  }
  GetType(typeName : string){
    this.projectService.GetYearOrType(0,typeName).subscribe(data => this.projectDetials = data)
    console.log(typeName);
    
  }
GetEngAndP(pId : string){
  this.projectService.getEndAnProject(pId).subscribe(data => console.log(data)
  );
}
  ngOnDestroy(): void {
    this.Camp$.unsubscribe;
    this.Contractor$.unsubscribe;
    this.Owner$.unsubscribe
    this.Type$.unsubscribe
    this.Project$.unsubscribe
    }
}