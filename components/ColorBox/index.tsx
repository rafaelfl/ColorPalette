import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ColorBoxProps {
  colorName: string;
  hexColor: string;
}

const ColorBox = ({ colorName, hexColor }: ColorBoxProps) => {
  const boxColor = StyleSheet.create({
    bgColor: {
      backgroundColor: hexColor,
    },
  });

  const textColor = StyleSheet.create({
    text: {
      fontWeight: 'bold',
      color:
        parseInt(hexColor.replace('#', ''), 16) > 0xffffff / 1.1
          ? 'black'
          : 'white',
    },
  });

  return (
    <View style={[styles.box, boxColor.bgColor]}>
      <Text style={textColor.text}>
        {colorName} {hexColor}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 3,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default ColorBox;
