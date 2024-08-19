import { Component, OnInit } from "@angular/core";
import {  RouterModule, RouterOutlet } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AuthService } from "./services/auth.service";
import { CampComponent } from "./components/camp/camp.component";
import { DashboardIconComponent } from "./dashboard/icons/dashboard-icon/dashboard-icon.component";
import { LayoutComponent } from "./dashboard/layout/layout.component";



const navBarButton = document.querySelector<HTMLElement>("header .oitems .iconbutton");
const navBar = document.querySelector<HTMLElement>("header .oitems .oitems-contuinar");

if (navBarButton && navBar) {
  navBarButton.addEventListener("click", e => {
    const icon = document.querySelector<SVGElement>("header .oitems .iconbutton svg.icon");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
      if (icon.classList.contains("fa-xmark")) {
        navBar.classList.toggle("active");
      } else {
        navBar.classList.toggle("active");
      }
    }
  });
}

@Component({
  selector: 'fn-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterOutlet,
    CampComponent,
    TranslateModule,
    LayoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

constructor(private tranlate : TranslateService,
            public authService : AuthService) {
}


 language : string = localStorage.getItem("language") || "ar"

  ngOnInit(): void {
    this.tranlate.setDefaultLang(this.language)  
  }

  activeButtonLung: string = this.language ;

  ChangeLung(lang: string) {
    this.tranlate.use(lang)
    localStorage.setItem('language', lang )
    this.activeButtonLung = lang;
  }
    
}
