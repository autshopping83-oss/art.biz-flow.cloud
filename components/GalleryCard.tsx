import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
  title: string;
  source: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function GalleryCard({ title, source, onPress, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: source }} style={styles.image} resizeMode="cover" />
      <View style={styles.caption}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#1F2937',
    marginBottom: 16,
    minHeight: 180
  },
  image: {
    width: '100%',
    height: 180
  },
  caption: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700'
  }
});
