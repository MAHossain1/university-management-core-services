/*
  Warnings:

  - You are about to drop the column `courseId` on the `student_enrolled_course_marks` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `student_enrolled_course_marks` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `student_enrolled_course_marks` table. All the data in the column will be lost.
  - You are about to drop the column `totalMarks` on the `student_enrolled_course_marks` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('MIDTERM', 'FINAL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PARTIAL_PAID', 'FULL_PAID');

-- DropForeignKey
ALTER TABLE "student_enrolled_course_marks" DROP CONSTRAINT "student_enrolled_course_marks_courseId_fkey";

-- AlterTable
ALTER TABLE "student_enrolled_course_marks" DROP COLUMN "courseId",
DROP COLUMN "point",
DROP COLUMN "status",
DROP COLUMN "totalMarks",
ADD COLUMN     "examType" "ExamType" NOT NULL DEFAULT 'MIDTERM',
ADD COLUMN     "marks" INTEGER,
ADD COLUMN     "studentEnrolledCourseId" TEXT;

-- CreateTable
CREATE TABLE "student_enrolled_courses" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "grade" TEXT,
    "point" DOUBLE PRECISION DEFAULT 0,
    "totalMarks" INTEGER DEFAULT 0,
    "status" "StudentEnrolledCourseStatus" DEFAULT 'ONGOING',

    CONSTRAINT "student_enrolled_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_semester_payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "fullPaymentAmount" INTEGER DEFAULT 0,
    "partialPaymentAmount" INTEGER DEFAULT 0,
    "totalDueAmount" INTEGER DEFAULT 0,
    "totalPaidAmount" INTEGER DEFAULT 0,
    "paymentStatus" "PaymentStatus" DEFAULT 'PENDING',

    CONSTRAINT "student_semester_payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_enrolled_courses" ADD CONSTRAINT "student_enrolled_courses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enrolled_courses" ADD CONSTRAINT "student_enrolled_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enrolled_courses" ADD CONSTRAINT "student_enrolled_courses_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enrolled_course_marks" ADD CONSTRAINT "student_enrolled_course_marks_studentEnrolledCourseId_fkey" FOREIGN KEY ("studentEnrolledCourseId") REFERENCES "student_enrolled_courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_payments" ADD CONSTRAINT "student_semester_payments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_semester_payments" ADD CONSTRAINT "student_semester_payments_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
