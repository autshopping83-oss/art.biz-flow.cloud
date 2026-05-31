import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FAB } from '@components/FAB';
import { GalleryCard } from '@components/GalleryCard';
import { useGallery } from '@hooks/useGallery';
import { GALLERY_TYPE } from '@utils/constants';

type Props = {
  onCreatePress: () => void;
  onLoginPress: () => void;
  userIsAuthenticated: boolean;
};

export function HomeScreen({ onCreatePress, onLoginPress, userIsAuthenticated }: Props) {
  const { items, loading, loadMore, hasMore } = useGallery(GALLERY_TYPE.WALLPAPER);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Galeria Pública</Text>
        <Text style={styles.subtitle}>Explore temas e papéis de parede gerados com IA.</Text>
        {!userIsAuthenticated && (
          <Text style={styles.cta} onPress={onLoginPress}>
            Criar conta / Login
          </Text>
        )}
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GalleryCard title={item.type} source={item.image_url ?? ''} />
        )}
        onEndReached={() => hasMore && loadMore()}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum item ainda.</Text>}
      />

      <FAB onPress={userIsAuthenticated ? onCreatePress : onLoginPress} label="Criar" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#101820' },
  header: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 10 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#C5C6C7', marginTop: 8, fontSize: 15 },
  cta: { marginTop: 16, color: '#00ADB5', fontSize: 16, fontWeight: '700' },
  list: { paddingHorizontal: 18, paddingBottom: 120 },
  empty: { color: '#EEEEEE', textAlign: 'center', marginTop: 40 }
});
