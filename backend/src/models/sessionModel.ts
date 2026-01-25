import { supabase } from '../config/supabase';

// Get all sessions
export const getAllSessions = async () => {
  const { data, error } = await supabase.from('sessions').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Get a single session by ID
export const getSessionById = async (id: string) => {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Create a new session
export const createSession = async (sessionData: any) => {
  const { data, error } = await supabase
    .from('sessions')
    .insert([sessionData])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

// Update a session
export const updateSession = async (id: string, sessionData: any) => {
  const { data, error } = await supabase
    .from('sessions')
    .update(sessionData)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

// Delete a session
export const deleteSession = async (id: string) => {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  return true;
};
