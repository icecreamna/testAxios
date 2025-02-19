import React, { useState, useEffect, cloneElement } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const RecipeCard = ({ recipes, onPress }) => {
    const [favorite, setFavorite] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            checkFavorite();
        }, [])
    );

    const checkFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorite(favorites.some((fav) => fav.idMeal === recipes.idMeal));
        } catch (error) {
            console.error("Error loading Favorite", error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            
            if (favorite) {
                favorites = favorites.filter((fav) => fav.idMeal !== recipes.idMeal);
            } else {
                favorites.push(recipes);
            }

            await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
            setFavorite(!favorite);
        } catch (error) {
            console.error("Error saving Favorite", error);
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: recipes.strMealThumb }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{recipes.strMeal}</Text>
                <View style={styles.footer}>
                    <Text style={styles.category}>Category: {recipes.strCategory}</Text>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                    <TouchableOpacity onPress={toggleFavorite}>
                        <MaterialIcons
                            name={favorite ? "favorite" : "favorite-border"}
                            size={28}
                            color={favorite ? "#ff6f61" : "white"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        margin: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 4,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        //marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        //marginBottom: 5,

    },
    category: {
        fontSize: 18,
        color: "#555",
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default RecipeCard;