import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ColorPalette from './screens/ColorPalette';
import ColorPaletteModal from './screens/ColorPaletteModal';
import Home from './screens/Home';
import { ColorData } from './types';

export type MainStackNavigatorParamList = {
  Home:
    | { newColorPalette: { paletteName: string; colors: Array<ColorData> } }
    | undefined;
  ColorPalette: { paletteName: string; colors: Array<ColorData> };
};

export type RootStackNavigatorParamList = {
  Main: NavigatorScreenParams<MainStackNavigatorParamList>;
  ColorPaletteModal: undefined;
};

const RootStack = createNativeStackNavigator<RootStackNavigatorParamList>();
const MainStack = createNativeStackNavigator<MainStackNavigatorParamList>();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

const ColorPaletteProject = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          presentation: 'modal',
        }}>
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ColorPaletteModal"
          component={ColorPaletteModal}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default ColorPaletteProject;
