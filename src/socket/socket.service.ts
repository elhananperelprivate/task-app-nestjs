import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
    constructor(private socketGateway: SocketGateway) { }

    handleTaskEditing(taskId: string): void {
        this.socketGateway.server.emit('taskEditing', taskId);
    }

    handleTaskEditingEnd(taskId: string): void {
        this.socketGateway.server.emit('taskEditingEnd', taskId);
    }

    handleTasksListEdited(): void {
        this.socketGateway.server.emit('loadTasks');
    }
}
