import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AddProjectModal } from '../../components/add-project-modal/add-project-modal';
import { AddTaskModal } from "../../components/add-task-modal/add-task-modal";



@Component({
  standalone: true,
  selector: 'app-welcome',
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    NzEmptyModule,
    NzFlexModule,
    NzButtonModule,
    NzFloatButtonModule,
    NzToolTipModule,
    AddProjectModal,
    AddTaskModal
],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  constructor(private taskService: TaskService) { }
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
        console.log('Projects fetched:', projects);
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
        console.log('Tasks fetched:', tasks);
      },
      error: error => {
        console.error('Error fetching tasks:', error);
      }
    });
  }
  markTaskComplete(id: string) {
    console.log('Marking task complete:', id);
    this.taskService.markTaskComplete(id).subscribe({
      next: updatedTask => {
        const task = this.tasks.find(t => t.id === updatedTask.id);
        if (task) {
          task.completed = updatedTask.completed;
        }
      },
      error: error => {
        console.error('Error marking task complete:', error);
      }
    });
  }
  markTaskIncomplete(id: string) {
    console.log('Marking task incomplete:', id);
    this.taskService.markTaskIncomplete(id).subscribe({
      next: updatedTask => {
        const task = this.tasks.find(t => t.id === updatedTask.id);
        if (task) {
          task.completed = updatedTask.completed;
        }
      },
      error: error => {
        console.error('Error marking task incomplete:', error);
      }
    });
  }
  checkProjects() {
    const hasPendingTasks = this.projects.some(project =>
      this.tasks.some(task => task.idProject === project.id && !task.completed)
    );

    if (hasPendingTasks && !this.selectedProjectId) {
      const firstProject = this.projects.find(p =>
        this.tasks.some(t => t.idProject === p.id && !t.completed)
      );
      this.selectedProjectId = firstProject?.id || null;
    }
  }
  selectProject(id: string) {
    this.selectedProjectId = id;
  }
  toggleCompleted(task: Task) {
    console.log('Toggling task completion:', task);
    if (task.completed) {
    this.markTaskIncomplete(task.id);
  } else {
    this.markTaskComplete(task.id);
  }
  }
  get filteredTasks(): Task[] {
    return this.tasks.filter(task => task.idProject === this.selectedProjectId);
  }
  get hasProjects(): boolean {
    return this.projects.length > 0;
  }



}
