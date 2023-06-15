import 'react-native-url-polyfill/auto';
import {createClient, Session} from '@supabase/supabase-js';
import React, {useState, useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import {SupabaseContext} from '../context';

// @ts-ignore
import {SUPABASE_URL, SUPABASE_KEY} from '@env';

// We are using Expo Secure Store to persist session info
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

type SupabaseProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNavigationReady, setNavigationReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setLoggedIn(true);
  };

  const register = async (email: string, password: string) => {
    const {error} = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const forgotPassword = async (email: string) => {
    const {error} = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const logout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) throw error;
    setLoggedIn(false);
  };

  const getProfile = async (session: Session | null) => {
    if (session?.user) {
      const {data, error, status} = await supabase
        .from('profiles')
        .select()
        .eq('id', session?.user.id)
        .single();

      if (data) setUser(data);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({data: {session}}) => {
      setSession(session);
      await getProfile(session);
      setLoggedIn(session !== null);
      setNavigationReady(true);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      await getProfile(session);
      setLoggedIn(session !== null);
      setNavigationReady(true);
    });
  }, []);

  return (
    <SupabaseContext.Provider
      value={{
        isLoggedIn,
        session,
        user,
        login,
        register,
        forgotPassword,
        logout,
      }}
    >
      {isNavigationReady ? props.children : null}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
