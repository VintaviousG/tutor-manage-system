import { Router } from 'express';
import { 
  getSessions, 
  getSession, 
  createNewSession, 
  updateExistingSession, 
  deleteExistingSession 
} from '../controllers/sessionController';

const router = Router();

router.get('/', getSessions);
router.get('/:id', getSession);
router.post('/', createNewSession);
router.put('/:id', updateExistingSession);
router.delete('/:id', deleteExistingSession);

export default router;
