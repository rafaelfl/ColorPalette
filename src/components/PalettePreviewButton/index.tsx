import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ColorData } from '../../types';

interface PalettePreviewButtonProps {
  colorPalette: {
    paletteName: string;
    colors: Array<ColorData>;
  };
  handlePress: () => void;
}

const PalettePreviewButton = ({
  colorPalette,
  handlePress,
}: PalettePreviewButtonProps) => {
  const { paletteName, colors } = colorPalette;
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{paletteName}</Text>
      <FlatList
        style={styles.list}
        data={colors.slice(0, 5)}
        keyExtractor={item => item.colorName}
        renderItem={({ item }) => (
          <View
            style={[
              styles.box,
              {
                backgroundColor: item.hexCode,
              },
            ]}
          />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  box: {
    width: 30,
    height: 30,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  list: {
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default PalettePreviewButton;
