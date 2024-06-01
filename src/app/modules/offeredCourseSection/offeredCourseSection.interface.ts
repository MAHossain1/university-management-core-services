import { weekDays } from '@prisma/client';

export type IOfferedCourseSectionFilterRequest = {
  searchTerm?: string | undefined;
  offeredCourseId?: string | undefined;
};

export type IClassSchedule = {
  startTime: string;
  endTime: string;
  dayOfWeek: weekDays;
  roomId: string;
  facultyId: string;
};

export type IOfferedCourseSectionCreate = {
  title: string;
  maxCapacity: number;
  offeredCourseId: string;
  classSchedules: IClassSchedule[];
};
