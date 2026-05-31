import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '@components/PrimaryButton';

type Props = {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
};

export function AuthScreen({ onLogin, onSignup, onGoogleSignIn }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Entrar ou Registar</Text>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <PrimaryButton label="Login" onPress={() => onLogin(email, password)} />
      <PrimaryButton label="Registar" onPress={() => onSignup(email, password)} style={styles.secondaryButton} />
      <PrimaryButton label="Entrar com Google" onPress={onGoogleSignIn} style={styles.googleButton} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0B0C10', padding: 20 },
  title: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', marginBottom: 24 },
  fieldGroup: { marginBottom: 16 },
  label: { color: '#C5C6C7', marginBottom: 6 },
  input: {
    backgroundColor: '#1F2833',
    borderRadius: 12,
    color: '#FFFFFF',
    padding: 14
  },
  secondaryButton: { marginTop: 12, backgroundColor: '#393E46' },
  googleButton: { marginTop: 12, backgroundColor: '#2D7FF9' }
});
