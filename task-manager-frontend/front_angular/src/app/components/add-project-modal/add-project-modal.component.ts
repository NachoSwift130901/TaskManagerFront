import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectPayload } from '../../models/project';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  standalone: true,
  selector: 'app-add-project-modal',
  imports: [NzButtonModule, NzModalModule, NzInputModule, FormsModule],
  templateUrl: './add-project-modal.component.html',
  styleUrl: './add-project-modal.component.scss'
})
export class AddProjectModalComponent {


  constructor(private taskService: TaskService, private message: NzMessageService) { }

  projectName : ProjectPayload= { name: '' };

  isVisible = false;
  isOkLoading = false;

  addProject(project: ProjectPayload) {
    this.taskService.createProject(project).subscribe({
      next: (createdProject) => {
        console.log('Project created successfully:', createdProject);
      },
      error: (error) => {
        console.error('Error creating project:', error);
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.taskService.createProject(this.projectName).subscribe({
      next: (createdProject) => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.projectName.name = '';
        this.message.success(`Project ${createdProject.name} created successfully!`);
      },
      error: (error) => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.error(`Error creating project: ${error.message}`);
      }
    })
  }
  handleCancel(): void {
    this.isVisible = false;
    this.projectName.name = '';
  }

}
