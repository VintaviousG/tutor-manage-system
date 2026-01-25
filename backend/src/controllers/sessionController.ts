import { Request, Response } from 'express';
import { 
  getAllSessions, 
  getSessionById, 
  createSession, 
  updateSession, 
  deleteSession 
} from '../models/sessionModel';

export const getSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await getAllSessions();
    res.json(sessions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const session = await getSessionById(id as string);
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewSession = async (req: Request, res: Response) => {
  try {
    const newSession = await createSession(req.body);
    res.status(201).json(newSession);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExistingSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSession = await updateSession(id as string, req.body);
    res.json(updatedSession);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExistingSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteSession(id as string);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
