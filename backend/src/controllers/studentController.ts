import { Request, Response } from 'express';
import { getAllStudents } from '../models/studentModel';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
