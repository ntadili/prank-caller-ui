// Mock Supabase client for development
const mockSupabase = {
  auth: {
    getSession: () => Promise.resolve({
      data: {
        session: {
          user: {
            email: 'demo@prankie.com',
            id: 'mock-user-id'
          }
        }
      },
      error: null
    }),
    signInWithPassword: ({ email, password }) => {
      if (email && password) {
        return Promise.resolve({ data: { user: { email } }, error: null });
      }
      return Promise.resolve({ data: null, error: { message: 'Invalid credentials' } });
    },
    signUp: ({ email, password }) => {
      if (email && password) {
        return Promise.resolve({ data: { user: { email } }, error: null });
      }
      return Promise.resolve({ data: null, error: { message: 'Invalid input' } });
    },
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: (email) => Promise.resolve({ error: null }),
    updateUser: ({ password }) => Promise.resolve({ error: null })
  },
  from: (table) => ({
    select: () => Promise.resolve({
      data: [{ credits: 42, id: 'mock-user-id', email: 'demo@prankie.com' }],
      error: null
    }),
    insert: (data) => Promise.resolve({ data, error: null }),
    update: (data) => Promise.resolve({ data, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  })
};

export { mockSupabase as supabase };


// import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// export function createClient() {
//   return createSupabaseClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
// }


