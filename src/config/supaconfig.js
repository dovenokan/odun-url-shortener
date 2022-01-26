import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SB_URL
const supabaseKey = process.env.REACT_APP_SB_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;