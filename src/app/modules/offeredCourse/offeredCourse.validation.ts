import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'Academic department id is required.',
    }),
    semesterRegistrationId: z.string({
      required_error: 'semesterRegistrationId is required.',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'CourseId is required.',
      }),
      {
        required_error: 'CourseIds are required.',
      }
    ),
  }),
});

export const OfferedCourseValidation = {
  create,
};
