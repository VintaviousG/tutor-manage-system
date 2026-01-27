import { supabase } from '../config/supabase';

//Get all students function to retrieve all students from Supabase DB
export const getAllStudents = async () => {
  const { data, error } = await supabase.from('students').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Get a single student based id but my id is uuid


//Get a Student based on email
export const getStudentByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Create a new student
export const createStudent = async (studentData: any) => {
  const { data, error } = await supabase
    .from('students')
    .insert([studentData])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

// Update a student
export const updateStudent = async (id: string, studentData: any) => {
  const { data, error } = await supabase
    .from('students')
    .update(studentData)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

// Delete a student
export const deleteStudent = async (id: string) => {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  return true;
};
