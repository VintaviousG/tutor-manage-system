import { supabase } from '../config/supabase';

export const getAllStudents = async () => {
  const { data, error } = await supabase.from('students').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
