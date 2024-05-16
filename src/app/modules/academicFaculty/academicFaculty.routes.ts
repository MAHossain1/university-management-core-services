import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.get('/', AcademicFacultyController.getAllFromDB);
router.get('/:id', AcademicFacultyController.getByIdFromDB);

router.post(
  '/',
  validateRequest(AcademicFacultyValidation.create),
  AcademicFacultyController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.update),
  AcademicFacultyController.updateOneInDB
);

router.delete('/:id', AcademicFacultyController.deleteByIdFromDB);

export const AcademicFacultyRoutes = router;
