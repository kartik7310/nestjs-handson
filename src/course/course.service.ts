import { Body, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModal: Model<Course>) {}

  async create(@Body() createCourseDto: CreateCourseDto) {
  try {
    const course = await this.courseModal.create({
    name:createCourseDto.name,
    description:createCourseDto.description,
    level:createCourseDto.level,
    price:createCourseDto.price
    })
    return course
  } catch (error) {
    
  }
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
