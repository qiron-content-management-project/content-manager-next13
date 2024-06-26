import axios from "axios";
import { apiUrl } from "./Api";

export const findAllCategories = async (auth) => {
    try {
        const response = await axios.get(`${apiUrl}/categories`, {
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        return {
            error: true,
            message: err.response,
        };
    }
}

export const findUserCategories = async (auth, userId) => {
    try {
        const response = await axios.get(`${apiUrl}/categories/findAllByUserId?userId=${userId}`, {
            headers: {
                'authorization': `Bearer ${auth.token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (err) {
        return {
            error: true,
            message: err.response,
        };
    }
}