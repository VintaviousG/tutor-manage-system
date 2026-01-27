import { supabase } from '../config/supabase';

export const getAllTutors = async () => {
  const { data, error } = await supabase.from('tutors').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Get a single tutor by ID
export const getTutorById = async (id: string) => {
  const { data, error } = await supabase
    .from('tutors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

//Get a Tutor based on email
export const getTutorByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('tutors')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Create a new tutor
export const createTutor = async (tutorData: any) => {
  const { data, error } = await supabase
    .from('tutors')
    .insert([tutorData])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

// Update a tutor
export const updateTutor = async (id: string, tutorData: any) => {
  const { data, error } = await supabase
    .from('tutors')
    .update(tutorData)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

// Delete a tutor
export const deleteTutor = async (id: string) => {
  const { error } = await supabase
    .from('tutors')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  return true;
};
