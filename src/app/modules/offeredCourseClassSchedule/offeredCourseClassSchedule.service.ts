import { OfferedCourseClassSchedule } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { offeredCourseClassScheduleUtils } from './offeredCourseClassSchedule.utils';

const insertIntoDB = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await offeredCourseClassScheduleUtils.checkRoomAvailable(data);

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      offeredCourseSection: true,
      semesterRegistration: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

export const OfferedCourseClassScheduleService = {
  insertIntoDB,
};
