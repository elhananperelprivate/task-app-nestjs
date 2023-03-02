import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Task, TaskDocument } from '../task/task.model';
import { TaskService } from '../task/task.service';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private editingTasks: string[] = [];

    constructor(private readonly taskService: TaskService) { }

    async handleConnection(client: Socket): Promise<void> {
        console.log(`Client connected: ${client.id}`);
        const editingTasks = await this.taskService.getTasks({ editing: true });
        this.editingTasks = editingTasks.map((task: TaskDocument) => task._id);
        this.server.emit('taskEditing', this.editingTasks);
    }

    handleDisconnect(client: Socket): void {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('editTask')
    async onEditTask(client: Socket, taskId: string): Promise<void> {
        this.editingTasks.push(taskId);
        this.server.emit('taskEditing', this.editingTasks);
        await this.taskService.updateTask(taskId, { editing: true });
    }

    @SubscribeMessage('taskEditingEnd')
    async onTaskEditingEnd(client: Socket, taskId: string): Promise<void> {
        const index = this.editingTasks.indexOf(taskId);
        if (index !== -1) {
            this.editingTasks.splice(index, 1);
            this.server.emit('taskEditing', this.editingTasks);
            await this.taskService.updateTask(taskId, { editing: false });
        }
    }

    @SubscribeMessage('loadTasks')
    onTasksListEdited(client: Socket): void {
        this.server.emit('loadTasks');
    }
}
