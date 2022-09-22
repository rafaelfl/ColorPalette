import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { MainStackNavigatorParamList } from '../../App';
import ColorBox from '../../components/ColorBox';

const ColorPalette = ({
  route,
}: NativeStackScreenProps<MainStackNavigatorParamList, 'ColorPalette'>) => {
  const { paletteName, colors } = route.params;

  return (
    <FlatList
      style={baseStyles.container}
      data={colors}
      keyExtractor={item => item.colorName}
      renderItem={({ item }) => (
        <ColorBox colorName={item.colorName} hexColor={item.hexCode} />
      )}
      ListHeaderComponent={<Text style={baseStyles.title}>{paletteName}</Text>}
    />
  );
};

const baseStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPalette;
