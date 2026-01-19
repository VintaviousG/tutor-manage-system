import { Request, Response } from 'express';
import { getAllTutors } from '../models/tutorModel';

export const getTutors = async (req: Request, res: Response) => {
  try {
    const tutors = await getAllTutors();
    res.json(tutors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
