import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
  label: string;
};

export function FAB({ onPress, label }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: '#00ADB5',
    borderRadius: 32,
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 4
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  }
});
