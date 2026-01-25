import { Request, Response } from 'express';
import { 
  getAllTutors, 
  getTutorById, 
  createTutor, 
  updateTutor, 
  deleteTutor 
} from '../models/tutorModel';

export const getTutors = async (req: Request, res: Response) => {
  try {
    const tutors = await getAllTutors();
    res.json(tutors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutor = await getTutorById(id as string);
    res.json(tutor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewTutor = async (req: Request, res: Response) => {
  try {
    const newTutor = await createTutor(req.body);
    res.status(201).json(newTutor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExistingTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTutor = await updateTutor(id as string, req.body);
    res.json(updatedTutor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExistingTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTutor(id as string);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
