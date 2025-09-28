import { Body, Injectable, NotFoundException } from '@nestjs/common';
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
      return this.courseModal.find().exec();

  }
 async findOne(id: string) {
    const course = await this.courseModal.findById(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }
  
  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const updatedCourse = await this.courseModal.findByIdAndUpdate(
      id,
      updateCourseDto,
      { new: true, runValidators: true }
    );
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  async remove(id: string) {
    const deletedCourse = await this.courseModal.findByIdAndDelete(id);
    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return { message: 'Course deleted successfully' };
  }
}
