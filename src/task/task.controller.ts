import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('api/tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    async getTasks(): Promise<{ tasks: Task[] }> {
        const tasks = await this.taskService.getTasks();
        return { tasks: tasks || [] };
    }

    @Post()
    async createTask(@Body() taskData: Task): Promise<{ task: Task }> {
        const task = await this.taskService.createTask(taskData);
        return { task };
    }

    @Put(':id')
    async updateTask(
        @Param('id') taskId: string,
        @Body() taskData: Task,
    ): Promise<{ task: Task }> {
        const task = await this.taskService.updateTask(taskId, taskData);
        return { task };
    }

    @Delete(':id')
    async deleteTask(@Param('id') taskId: string): Promise<{ task: Task }> {
        const task = await this.taskService.deleteTask(taskId);
        return { task };
    }
}
