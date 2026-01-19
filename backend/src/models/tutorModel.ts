import { supabase } from '../config/supabase';

export const getAllTutors = async () => {
  const { data, error } = await supabase.from('tutors').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
