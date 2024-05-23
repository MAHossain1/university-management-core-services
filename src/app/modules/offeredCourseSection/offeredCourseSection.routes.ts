import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseController';

const router = express.Router();

router.get('/', OfferedCourseSectionController.getAllFromDB);

router.post('/', OfferedCourseSectionController.insertIntoDB);

export const OfferedCourseSectionRoutes = router;
