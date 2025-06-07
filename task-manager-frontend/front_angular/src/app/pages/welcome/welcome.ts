import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Project } from '../../models/project';
import { Task } from '../../models/task';

@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [CommonModule, NzMenuModule, NzIconModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class Welcome implements OnInit {
  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.getTasks();
    this.getProjects();
  }

  projects: Project[] = [];
  tasks: Task[] = [];
  selectedProjectId: string | null = null;

  getProjects() {
    this.taskService.getProjects().subscribe({
      next: projects => {
        this.projects = projects;
        if (projects.length) {
          this.selectedProjectId = projects[0].id; 
        }
      },
      error: error => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;
      },
      error: error => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  selectProject(id: string) {
    this.selectedProjectId = id;
  }

  toggleCompleted(task: Task) {
    task.completed = !task.completed;
    // Aquí puedes llamar a un método del servicio si deseas persistir el cambio
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter(task => task.idProject === this.selectedProjectId);
  }


}
