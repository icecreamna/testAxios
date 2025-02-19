import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage";



const RecipeDetailScreen = ({ route }) => {
    const { recipe } = route.params
    const [isFavorite, setIsFavorite] = useState(false)
    

    const ingredientsdetail = (recipe) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`].trim()
            ingredient !== '' ? ingredients.push(ingredient) : null

        }
        return ingredients
    }
    const Measuredetail = (recipe) => {
        const strMeasures = [];
        for (let i = 0; i < 20; i++) {
            const Measures = recipe[`strMeasure${i}`]
            Measures && Measures.trim() !== '' ? strMeasures.push(Measures) : null
        }
        return strMeasures
    }

    useEffect(() => {
        checkFavorite();
    }, [])

    const checkFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites')
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : []
            const exists = favorites.some((fav) => fav.idMeal === recipe.idMeal)
            setIsFavorite(exists)
        } catch (error) {
            console.error('Error loading Favorite', error)
        }
    }

    const togglefavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites')
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : []
            if (isFavorite) {
                //Remove
                favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal)
            } else {
                //Add
                favorites.push(recipe)
            }
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
            setIsFavorite(!isFavorite)
        } catch (error) {
            console.error('Error Saving Favorite', error)
        }
        // setIsFavorite(!isFavorite)
    }



    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: recipe.strMealThumb }}
                style={styles.image}
            />
            <TouchableOpacity
                onPress={togglefavorite}
                style={styles.favoriteButton}
            >
                <MaterialIcons
                    name={isFavorite ? 'favorite' : 'favorite-border'}
                    size={28}
                    color={isFavorite ? '#ff6f61' : 'white'} />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.title}>{recipe.strMeal}</Text>
                <Text style={{}}>{recipe.strCategory}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {ingredientsdetail(recipe).map((ingredient, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <MaterialIcons name='check-box' size={18} color='#ff6f61' />
                        <Text style={styles.ingredientText}>{ingredient}</Text>
                        <Text style={styles.measureText}>{Measuredetail(recipe)[index]}</Text>
                    </View>
                ))}

            </View>
            <Text style={styles.ingredient}>Number of ingredient :{ingredientsdetail(recipe).length}</Text>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.instruction} >{recipe.strInstructions}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#f8f8f8",
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 15,
        marginBottom: 15,
    },
    header: {
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
    },
    category: {
        fontSize: 18,
        color: "#888",
        marginTop: 5,
    },
    section: {
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 10,
    },
    ingredientContainer: {
        flexDirection: "column",
    },
    ingredientRow: {
        flexDirection: "row",
        marginBottom: 5,
        justifyContent: "space-between"
    },
    ingredientText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
        width: "50%"
    },
    measureText: {
        fontSize: 16,
        color: "#666",
        textAlign: "right",
        width: "30%",
    },
    instruction: {
        fontSize: 16,
        color: "#444",
        lineHeight: 24,
        textAlign: "justify",
    },
    ingredient: {
        fontSize: 16,
        lineHeight: 22,
        color: "#333",
    },
    favoriteButton: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        padding: 10,
        borderRadius: 50,
    },
});

export default RecipeDetailScreen;
//.