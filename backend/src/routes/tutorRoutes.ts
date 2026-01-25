import { Router } from 'express';
import { 
  getTutors, 
  getTutor, 
  createNewTutor, 
  updateExistingTutor, 
  deleteExistingTutor 
} from '../controllers/tutorController';

const router = Router();

router.get('/', getTutors);
router.get('/:id', getTutor);
router.post('/', createNewTutor);
router.put('/:id', updateExistingTutor);
router.delete('/:id', deleteExistingTutor);

export default router;
