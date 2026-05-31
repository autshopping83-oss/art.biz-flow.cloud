import { useEffect, useState } from 'react';
import { supabaseClient, SupabaseUser } from '@services/supabaseClient';

export function useAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabaseClient.auth.getSession();
    session.then(({ data }) => {
      setUser(data.session?.user ? { id: data.session.user.id, email: data.session.user.email } : null);
      setLoading(false);
    });

    const { data: authListener } = supabaseClient.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) throw error;
  }

  async function signUpWithEmail(email: string, password: string) {
    setLoading(true);
    const { error } = await supabaseClient.auth.signUp({ email, password });
    setLoading(false);
    if (error) throw error;
  }

  async function signInWithGoogle() {
    const { error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google' });
    if (error) throw error;
  }

  async function signOut() {
    await supabaseClient.auth.signOut();
  }

  return {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut
  };
}
