import React from 'react'
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


function LogOutbutton() {

  // Docs used for Sign Out: https://supabase.com/docs/guides/auth/signout
  const logOut = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    window.location.reload()
    console.log(`User logged off: ${supabase.auth.signOut}`);
  }
  
  return (
    <div className='text-white relative top-2'>
      <button onClick={logOut}
      className='w-22 h-10 rounded-sm bg-blue-900 cursor-pointer'>Log out</button>      
    </div>

  )
}

export default LogOutbutton