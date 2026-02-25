import { Router } from 'express';
import { 
  getStudents, 
  getStudent, 
  createNewStudent, 
  updateExistingStudent, 
  deleteExistingStudent 
} from '../controllers/studentController';

const router = Router();

router.get('/', getStudents);
router.get('/:id', getStudent);
router.post('/', createNewStudent);
router.put('/:id', updateExistingStudent);
router.delete('/:id', deleteExistingStudent);

export default router;
