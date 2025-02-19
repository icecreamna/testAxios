
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const FavoritesScreen = () => {

  
  const [favorite, setFavorite] = useState([])

  const loadFavorite = async () => {
    try {
        const storedFavorites = await AsyncStorage.getItem('favorites')
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : []
        setFavorite(favorites)
    } catch (error) {
        console.error('Error loading Favorite', error)
    }
}

  useEffect(() => {
    loadFavorite();
  }, [favorite])
  
  return (
    <View style={styles.container}>
      {favorite.length > 0 ? (
        <FlatList
          data={favorite}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => {
            return (
              <View
                style={styles.card}
              >
                <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                <Text style={styles.title}>{item.strMeal}</Text>
                <MaterialIcons name="favorite" size={24} color="#ff6f61" style={styles.icon} />
              </View>
            )
          }}
        />
      ) : (
        <Text style={styles.empty}>No favorite yet</Text>
      )}
    </View>
  );

  
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: 'center',

  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#999",
    textAlign: 'center',
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1
  },
  icon: { marginRight: 10 },

});

export default FavoritesScreen;
//.
