import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ProjectService } from '../../services/project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProjectEngineer } from '../../models/project-engineer';
import { Engineer } from '../../models/General/Owner/engineer';

@Component({
  selector: 'fn-engineer-detail',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule,
    InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule,
    FormsModule, InputNumberModule, TranslateModule],
  templateUrl: './engineer-detail.component.html',
  styleUrl: './engineer-detail.component.css'
})
export class EngineerDetailComponent {
  form!: FormGroup;
  projectsEngineers! : ProjectEngineer[]
  projectEngineer! : ProjectEngineer
  engineers! : Engineer[]
  selectEngineers! : Engineer[] | null
  constructor(private projectService: ProjectService, 
    private route : ActivatedRoute ,
    public authService : AuthService,
    public router : Router
  ) {
  }

  ngOnInit() {
      var projectId = this.route.snapshot.paramMap.get("projectId")
      if(projectId != null){
         this.projectService.getEndAnProject(projectId).subscribe(data => this.projectsEngineers = data)
      }
  }
  
  clickToRuternBack(){
    this.router.navigate(['/projects'])
  }
}
