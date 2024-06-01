import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentEnrolledCourseMarkFilterableFields } from './studentEnrolledCourseMark.constant';
import { StudentEnrolledCourseMarkService } from './studentEnrolledCourseMark.service';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentEnrolledCourseMarkFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await StudentEnrolledCourseMarkService.getAllFromDB(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student course marks fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateStudentMarks = catchAsync(async (req: Request, res: Response) => {
  const result = StudentEnrolledCourseMarkService.updateStudentMarks(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated marks',
    data: result,
  });
});

export const StudentEnrolledCourseMarkController = {
  getAllFromDB,
  updateStudentMarks,
};
