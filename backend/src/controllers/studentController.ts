import { Request, Response } from 'express';
import { 
  getAllStudents,  
  getStudentByEmail,
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../models/studentModel';
//Get all students function to retrieve all students from Supabase DB
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getStudent = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const student = await getStudentByEmail(email as string);
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = await createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExistingStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedStudent = await updateStudent(id as string, req.body);
    res.json(updatedStudent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExistingStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteStudent(id as string);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
