import { Component, Input } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sidebar-item',
  templateUrl: './sidebar-item.component.html',
  standalone: true,
  imports:[ RouterModule]
})
export class SidebarItemComponent {
  @Input() title: string;
  @Input() routerLink: string;

  constructor(private dashboard: DashboardService) {
    this.title = '';
    this.routerLink = '';
  }

  currentRoute() {
    return this.dashboard.currentRoute
  }
}
