import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Create Supabase client for frontend auth
export const supabase = createSupabaseClient(supabaseUrl, publicAnonKey);

// Auth helpers
export const authHelpers = {
  // Sign in with email/password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Store access token
    if (data.session?.access_token) {
      localStorage.setItem('access_token', data.session.access_token);
    }

    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    // Clear access token
    localStorage.removeItem('access_token');
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;

    // Update stored token if session exists
    if (data.session?.access_token) {
      localStorage.setItem('access_token', data.session.access_token);
    }

    return data.session;
  },

  // Get current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) throw error;

    return data.user;
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      const session = await authHelpers.getSession();
      return !!session;
    } catch {
      return false;
    }
  },
};
