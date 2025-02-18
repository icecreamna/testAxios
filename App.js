import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoriteScreens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator สำหรับ Home + RecipeDetail
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#ff6f61' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontSize: 24, fontWeight: 'bold' }
      }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Gin Laew Tie' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ title: 'Recipe Detail' }} />
    </Stack.Navigator>
  );
}

// Tab Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#ff6f61' },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#ccc',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') {
              iconName = 'home';
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack} 
          options={{ title: 'Home', headerShown: false }} // ซ่อน Header ซ้อน
        />
        <Tab.Screen 
          
          name="Favorites" 
          component={FavoritesScreen} 
          options={{ title: 'Favorite' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
