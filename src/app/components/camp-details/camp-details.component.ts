import { Component, OnInit, Output, ViewChild } from '@angular/core';
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
import { Observable, Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { Camp } from '../../models/General/Place/camp';
import { Locations } from '../../models/General/Place/location';
import { CampService } from '../../services/camp.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as L from 'leaflet'

@Component({
  selector: 'fn-camp',
  standalone: true,
  imports:[TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule,
    InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule,
    FormsModule, InputNumberModule, TranslateModule ],
providers: [MessageService, ConfirmationService],
  templateUrl: './camp-details.component.html',
  styleUrl: './camp-details.component.css'
})
export class CampDetailsComponent implements OnInit{
  map! : L.Map
  form!: FormGroup;
  camp!: Camp;
  x: number =  36.128254;
  show : boolean = false
  Location$! : Observable<Locations[]>
  constructor(private campService: CampService, 
    private route : ActivatedRoute ,
    public authService : AuthService,
    public router : Router
  ) {
  }

  ngOnInit() {
      var currentCampId = this.route.snapshot.paramMap.get('id')
      if(currentCampId != null){
        this.campService.getCamp(currentCampId).subscribe(data => this.camp = data);
        this.Location$! = this.campService.Locations$
      }
  }
  showMap(camp : Camp) {
    this.show = !this.show
    if(this.show){
      this.map = L.map('map',{center: [camp.latityde,camp.longityde],zoom:13});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: '&copy; OpenstreetMap contributors'}).addTo(this.map);
    L.marker( [camp.latityde,camp.longityde]).addTo(this.map)
                                .openPopup()
    }
    else{
      this.map.stop().remove()
    }
  }

  clickToRuternBack(){
    this.router.navigate(['/projects'])
  }
 }  
