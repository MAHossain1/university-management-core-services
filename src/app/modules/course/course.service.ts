import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: any): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;
  console.log(preRequisiteCourses);

  const result = await prisma.course.create({
    data: courseData,
  });

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    for (let index = 0; index < preRequisiteCourses.length; index++) {
      const createPrerequisite = await prisma.courseToPrerequisite.create({
        data: {
          courseId: result.id,
          prerequisiteId: preRequisiteCourses[index].courseId,
        },
      });
      console.log(createPrerequisite);
    }
  }

  return result;
};

export const CourseService = { insertIntoDB };