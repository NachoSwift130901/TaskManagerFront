import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Project, ProjectPayload } from '../../models/project';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  standalone: true,
  selector: 'app-add-project-modal',
  imports: [NzButtonModule, NzModalModule, NzInputModule, FormsModule],
  templateUrl: './add-project-modal.html',
  styleUrl: './add-project-modal.scss'
})
export class AddProjectModal {
  constructor(private taskService: TaskService, private message: NzMessageService) { }

  @Output() projectCreated = new EventEmitter<void>();
  @Output() projectUpdated = new EventEmitter<void>();
  @ViewChild('editProjectModal') editProjectModal!: AddProjectModal;
  projectPayload: ProjectPayload = { name: '' };
  projectIdToEdit: string | null = null;

  isEditMode = false;
  isVisible = false;
  isOkLoading = false;

  addProject(project: ProjectPayload) {
    this.taskService.createProject(project).subscribe({
      next: (createdProject) => {
        console.log('Project created successfully:', createdProject);
        this.projectCreated.emit();
      },
      error: (error) => {
        console.error('Error creating project:', error);
      }
    });
  }
  editProject() {
    const editProjectPayload: Project = { name: this.projectPayload.name, id: this.projectIdToEdit! };
    this.taskService.editProject(editProjectPayload).subscribe({
      next: (updatedProject) => {
        console.log('Project updated successfully:', updatedProject);
        this.projectUpdated.emit();
      },
      error: (error) => {
        console.error('Error updating project:', error);
      }
    });
  }
showModal(projectToEdit?: Project): void {
  this.isVisible = true;

  if (projectToEdit) {
    this.isEditMode = true;
    this.projectIdToEdit = projectToEdit.id;
    this.projectPayload.name = projectToEdit.name;
  } else {
    this.isEditMode = false;
    this.projectIdToEdit = null;
    this.projectPayload.name = '';
  }
}


  handleOk(): void {
    this.isOkLoading = true;

    if (this.isEditMode && this.projectIdToEdit) {
      this.editProject();
    } else {
      this.addProject(this.projectPayload);
    }

    this.isVisible = false;
    this.isOkLoading = false;
    this.projectPayload.name = '';
  }

  handleCancel(): void {
    this.isVisible = false;
    this.projectPayload.name = '';
  }

}
