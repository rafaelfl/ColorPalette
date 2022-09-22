import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MainStackNavigatorParamList,
  RootStackNavigatorParamList,
} from '../../App';
import { COLORS } from '../../../constants';
import { ColorData } from '../../types';

type ColorPaletteModalProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackNavigatorParamList>,
  NativeStackScreenProps<RootStackNavigatorParamList>
>;

const ColorPaletteModal = ({ navigation }: ColorPaletteModalProps) => {
  const [colorPaletteName, setColorPaletteName] = useState('');

  const [selectedColors, setSelectedColors] = useState<Array<ColorData>>([]);

  const handleValueChange = useCallback((item: ColorData, value: boolean) => {
    if (value) {
      setSelectedColors(current => [...current, item]);
    } else {
      setSelectedColors(current =>
        current.filter(c => c.colorName !== item.colorName),
      );
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!colorPaletteName) {
      Alert.alert('Please enter a palette name');
    } else if (selectedColors.length < 3) {
      Alert.alert('Please add at least 3 colors');
    } else {
      navigation.navigate('Home', {
        newColorPalette: {
          paletteName: colorPaletteName,
          colors: selectedColors,
        },
      });
    }
  }, [navigation, colorPaletteName, selectedColors]);

  return (
    <View style={styles.container}>
      <Text>Name of your color palette</Text>
      <TextInput
        style={styles.input}
        value={colorPaletteName}
        onChangeText={setColorPaletteName}
        placeholder="Palette name"
      />
      <FlatList
        data={COLORS}
        keyExtractor={item => item.colorName}
        renderItem={({ item }) => (
          <View style={styles.colorRow}>
            <View style={styles.colorDescription}>
              <View
                style={[styles.circleColor, { backgroundColor: item.hexCode }]}
              />
              <Text>{item.colorName}</Text>
            </View>
            <Switch
              value={selectedColors.includes(item)}
              onValueChange={val => handleValueChange(item, val)}
            />
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
    borderRadius: 5,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  button: {
    backgroundColor: 'teal',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  colorDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleColor: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default ColorPaletteModal;
