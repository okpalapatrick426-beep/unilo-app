'use server';
import { createClient } from "@/app/utils/supabase";

// For the Success Page (Single Hostel)
export async function getHostelDetails(title: string) {
  try {
    const supabase = await createClient(); 
    const { data, error } = await supabase
      .from('unlocked_room_data')
      .select('title, secret_location, contact')
      .eq('title', title)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    return null;
  }
}

// For the Home Page (All Hostels)
export async function getAllHostels() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('unlocked_room_data')
      .select('title, secret_location, contact, price, junction');

    if (error) {
      console.error('Supabase error:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    return [];
  }
}