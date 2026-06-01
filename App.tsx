import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Analytics } from '@vercel/analytics/react';
import { useAuth } from '@hooks/useAuth';
import { AuthScreen } from '@screens/AuthScreen';
import { CreateScreen } from '@screens/CreateScreen';
import { HomeScreen } from '@screens/HomeScreen';

type Screen = 'home' | 'auth' | 'create';

export default function App() {
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [screen, setScreen] = useState<Screen>('home');

  if (loading) {
    return <SafeAreaView style={styles.loadingRoot} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {screen === 'home' && (
          <HomeScreen
            userIsAuthenticated={Boolean(user)}
            onCreatePress={() => setScreen('create')}
            onLoginPress={() => setScreen('auth')}
          />
        )}
        {screen === 'auth' && (
          <AuthScreen
            onLogin={signInWithEmail}
            onSignup={signUpWithEmail}
            onGoogleSignIn={signInWithGoogle}
          />
        )}
        {screen === 'create' && user ? <CreateScreen userId={user.id} /> : null}
        <Analytics />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0A0F18' },
  container: { flex: 1 },
  loadingRoot: { flex: 1, backgroundColor: '#0A0F18' }
});
