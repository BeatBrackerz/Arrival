import {createContext} from 'react';
import {Session} from '@supabase/supabase-js';

type SupabaseContextProps = {
  isLoggedIn: boolean;
  session: Session | null;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const SupabaseContext = createContext<SupabaseContextProps>({
  isLoggedIn: false,
  session: null,
  user: null,
  login: async () => {},
  register: async () => {},
  forgotPassword: async () => {},
  logout: async () => {},
});

export default SupabaseContext;
