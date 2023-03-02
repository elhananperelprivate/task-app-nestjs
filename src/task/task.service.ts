import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    async getTasks(query = {}): Promise<Task[]> {
        return await this.taskModel.find(query).exec();
    }

    async createTask(taskData: Task): Promise<Task> {
        const newTask = new this.taskModel(taskData);
        return await newTask.save();
    }

    async updateTask(taskId: string, taskData: Partial<Task>): Promise<Task> {
        return await this.taskModel.findByIdAndUpdate(taskId, taskData, {
            new: true,
        });
    }

    async deleteTask(taskId: string): Promise<Task> {
        return await this.taskModel.findByIdAndDelete(taskId);
    }
}
