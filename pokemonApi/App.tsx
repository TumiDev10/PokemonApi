import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getPokemonAbility } from './api';

const App = () => {
    const [abilities, setAbilities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbilities = async () => {
            try {
                const fetchedAbilities: any[] = [];

                // Fetch abilities with IDs from 1 to 150
                for (let i = 1; i <= 150; i++) {
                    const ability = await getPokemonAbility(i);
                    fetchedAbilities.push(ability);
                }

                setAbilities(fetchedAbilities);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAbilities();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Pokemon Abilities</Text>
                {loading ? (
                    <Text style={styles.loadingText}>Loading abilities...</Text>
                ) : (
                    <View style={styles.abilityContainer}>
                        {abilities.map((ability) => (
                            <View
                                style={[styles.abilityItem, { backgroundColor: getRandomColor() }]}
                                key={ability.id}
                            >
                                <Text style={styles.abilityId}>#{ability.id}</Text>
                                {ability.sprites && ability.sprites.front_default && (
                                    <Image
                                        source={{ uri: ability.sprites.front_default }}
                                        style={styles.abilityImage}
                                    />
                                )}
                                <Text style={styles.abilityName}>{ability.name}</Text>
                                <Text style={styles.abilityDescription}>{ability.effect_entries[0].effect}</Text>
                                <Text style={styles.abilityDetails}>Generation: {ability.generation.name}</Text>
                                <Text style={styles.abilityDetails}>Pokemon Count: {ability.pokemon.length}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const getRandomColor = () => {
    const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 18,
        marginBottom: 10,
    },
    abilityContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    abilityItem: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: 350,
        height: 620,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    abilityId: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    abilityImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    abilityName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    abilityDescription: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    abilityDetails: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center',
    },
});

export default App;
