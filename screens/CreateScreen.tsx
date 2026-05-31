import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryButton } from '@components/PrimaryButton';
import { useCreateWallpaper } from '@hooks/useCreateWallpaper';
import { GALLERY_TYPE } from '@utils/constants';

type Props = {
  userId: string;
};

export function CreateScreen({ userId }: Props) {
  const [type, setType] = useState<'theme' | 'wallpaper'>(GALLERY_TYPE.WALLPAPER);
  const [description, setDescription] = useState('');
  const { prompt, imageUrl, loading, createPrompt, generateImage, publishWallpaper } = useCreateWallpaper();

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.heading}>Criar</Text>
      <View style={styles.switchRow}>
        <Text style={[styles.switchLabel, type === 'theme' && styles.active]}>Tema</Text>
        <Text style={[styles.switchLabel, type === 'wallpaper' && styles.active]}>Papel de Parede</Text>
      </View>
      <TextInput
        placeholder="Descreve a tua ideia"
        placeholderTextColor="#7B8A97"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <PrimaryButton
        label="Gerar prompt Gemini"
        onPress={() => createPrompt(type, description)}
      />
      {prompt ? <Text style={styles.prompt}>Prompt: {prompt}</Text> : null}
      {type === 'wallpaper' && (
        <PrimaryButton
          label="Gerar Imagem"
          onPress={() => generateImage(prompt)}
          disabled={!prompt || loading}
        />
      )}
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.preview} /> : null}
      <PrimaryButton
        label="Publicar"
        onPress={() => publishWallpaper(userId, type)}
        disabled={!imageUrl}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#161616', padding: 18 },
  heading: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginBottom: 18 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  switchLabel: { color: '#8E8E8E', fontSize: 16, fontWeight: '700' },
  active: { color: '#00ADB5' },
  input: {
    backgroundColor: '#1F2933',
    color: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    minHeight: 90
  },
  prompt: { color: '#F8F8F8', marginTop: 16, marginBottom: 12 },
  preview: { width: '100%', height: 240, borderRadius: 16, marginTop: 16 }
});
