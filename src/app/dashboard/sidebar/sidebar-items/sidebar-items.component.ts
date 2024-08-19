import { Component } from '@angular/core';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { DashboardIconComponent } from '../../icons/dashboard-icon/dashboard-icon.component';
import { ProjectIconComponent } from '../../icons/project-icon/project-icon.component';
import { TaskIconComponent } from '../../icons/task-icon/task-icon.component';
import { CalendarIconComponent } from '../../icons/calendar-icon/calendar-icon.component';
import { TimeManageIconComponent } from '../../icons/time-manage-icon/time-manage-icon.component';
import { ReportIconComponent } from '../../icons/report-icon/report-icon.component';
import { SettingsIconComponent } from '../../icons/settings-icon/settings-icon.component';
import { DocIconComponent } from '../../icons/doc-icon/doc-icon.component';

@Component({
  selector: 'sidebar-items',
  templateUrl: './sidebar-items.component.html',
  standalone:true,
  imports:[SidebarItemComponent,DashboardIconComponent,ProjectIconComponent,TaskIconComponent,CalendarIconComponent,TimeManageIconComponent,ReportIconComponent,SettingsIconComponent,DocIconComponent]
})
export class SidebarItemsComponent {

}
