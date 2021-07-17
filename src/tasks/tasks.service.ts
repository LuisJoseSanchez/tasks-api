import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task>{
    return this.taskModel.findById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto);
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }
}
