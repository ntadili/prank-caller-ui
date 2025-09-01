// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// Mock Supabase client for development when env vars are not set
const supabase = {
  auth: {
    signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    updateUser: async () => ({ data: null, error: { message: 'Supabase not configured' } })
  },
  from: () => ({
    select: () => ({ data: [{ credits: 42 }], error: null })
  })
};
export { supabase };


// import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// export function createClient() {
//   return createSupabaseClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
// }


