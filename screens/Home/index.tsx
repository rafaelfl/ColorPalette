import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MainStackNavigatorParamList,
  RootStackNavigatorParamList,
} from '../../App';
import PalettePreviewButton from '../../components/PalettePreviewButton';
import { ColorData } from '../../types';

type HomeScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackNavigatorParamList, 'Home'>,
  NativeStackScreenProps<RootStackNavigatorParamList>
>;

const Home = ({ navigation, route }: HomeScreenNavigationProps) => {
  const newColorPalette = route.params?.newColorPalette;

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [colorPalette, setColorPalette] = useState<
    Array<{
      paletteName: string;
      colors: Array<ColorData>;
    }>
  >([]);

  const fetchColorPalettes = useCallback(async () => {
    const url: string | undefined = process.env.APP_ENV_BASE_URL;

    if (url) {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();

          setColorPalette(data);
        } else {
          setColorPalette([]);
        }
      } catch (error) {
        console.error(error);
        setColorPalette([]);
      }
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setIsRefreshing(false);
  }, [fetchColorPalettes]);

  useEffect(() => {
    fetchColorPalettes().then(() => setIsLoading(false));
  }, [fetchColorPalettes]);

  useEffect(() => {
    if (
      newColorPalette &&
      newColorPalette.paletteName &&
      !colorPalette.find(c => c.paletteName === newColorPalette.paletteName)
    ) {
      setColorPalette(current => [
        {
          paletteName: newColorPalette.paletteName,
          colors: newColorPalette.colors,
        },
        ...current,
      ]);
    }
  }, [colorPalette, newColorPalette]);

  return isLoading ? (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <FlatList
      style={styles.list}
      data={colorPalette}
      keyExtractor={item => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreviewButton
          colorPalette={item}
          handlePress={() => navigation.navigate('ColorPalette', item)}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('ColorPaletteModal')}>
          <Text style={styles.buttonText}>Add a color scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
    marginBottom: 10,
  },
});

export default Home;
