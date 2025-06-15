import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TaskService } from '../../services/task.service';
import { Project } from '../../models/project';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AddTaskModal } from "../../components/add-task-modal/add-task-modal";
import { AddProjectModal } from "../../components/add-project-modal/add-project-modal";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-project-admin',
  imports: [NzTableModule, NzDividerModule, NzButtonModule, AddTaskModal, AddProjectModal, NzPopconfirmModule],
  templateUrl: './project-admin.html',
  styleUrl: './project-admin.scss'
})
export class ProjectAdmin implements OnInit {
  ngOnInit() {
    this.getProjects();
  }
  constructor(private taskService: TaskService, private nzMessageService: NzMessageService, ) { }

  listOfData: Project[] = [];

  sortOrder: 'ascend' | 'descend' | null = null;
  selectedProjectId: string | null = null;
  

  sortData(order: 'ascend' | 'descend' | null): void {
    this.sortOrder = order;
    if (order) {
      this.listOfData = [...this.listOfData].sort((a, b) =>
        order === 'ascend'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
  }

  onEdit(project: any): void {
    console.log('Editar', project);
    // Aquí puedes abrir un modal o navegar a otra página
  }

  onDelete(project: any): void {
    console.log('Borrar', project);
    // Aquí puedes lanzar una confirmación y eliminar el proyecto
  }

  getProjects(): void {
    this.taskService.getProjects().subscribe({
      next: projects => {
        console.log('Projects fetched:', projects);
        this.listOfData = projects;
      },
      error: error => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  // Delete project confirmation
  cancel(): void {
    this.nzMessageService.info('Canceled');
  }

  confirm(project: Project): void {
    this.taskService.deleteProject(project.id).subscribe({
      next: () => {
        this.getProjects()
        this.nzMessageService.success(`${project.name} deleted successfully`);
      },
      error: error => {
        this.nzMessageService.error(`Failed to delete ${project.name}`);
      }
    });
  }
}
