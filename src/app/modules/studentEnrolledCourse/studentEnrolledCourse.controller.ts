import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentEnrolledCourseFilterableFields } from './studentEnrolledCourse.constant';
import { StudentEnrolledCourseService } from './studentEnrolledCourse.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentEnrolledCourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'StudentEnrolledCourse created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentEnrolledCourseFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await StudentEnrolledCourseService.getAllFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'StudentEnrolledCourses fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const StudentEnrolledCourseController = {
  insertIntoDB,
  getAllFromDB,
};
