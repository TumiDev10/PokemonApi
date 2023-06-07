import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonAbility = async (abilityId: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/ability/${abilityId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ability:', error);
        throw error;
    }
};
