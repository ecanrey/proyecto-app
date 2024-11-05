// src/services/proyectoService.js
import axios from 'axios';

// Considera utilizar una variable de entorno para la URL base de tu API
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/proyectos"; // URL base de tu API


// Obtener todos los proyectos
export const getProyectos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        throw error; // Lanza el error para manejarlo donde se llame
    }
};

// Crear un nuevo proyecto
export const createProyecto = async (proyecto) => {
    try {
        const response = await axios.post(API_URL, proyecto);
        return response.data; // Devuelve los datos del nuevo proyecto
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        throw error; // Lanza el error para manejarlo donde se llame
    }
};

// Obtener un proyecto por ID
export const getProyectoById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Devuelve los datos del proyecto
    } catch (error) {
        console.error(`Error al obtener el proyecto con ID ${id}:`, error);
        throw error; // Lanza el error para manejarlo donde se llame
    }
};

// Actualizar un proyecto
export const updateProyecto = async (id, proyecto) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, proyecto);
        return response.data; // Devuelve los datos actualizados del proyecto
    } catch (error) {
        console.error(`Error al actualizar el proyecto con ID ${id}:`, error);
        throw error; // Lanza el error para manejarlo donde se llame
    }
};

// Eliminar un proyecto
export const deleteProyecto = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); // No devuelve datos, pero puedes manejar errores
    } catch (error) {
        console.error(`Error al eliminar el proyecto con ID ${id}:`, error);
        throw error; // Lanza el error para manejarlo donde se llame
    }
};
