// src/components/ProyectoForm.js
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/proyectos"; // URL base de tu API

const ProyectoForm = ({ proyectoInicial, onSave }) => {
    const [proyecto, setProyecto] = useState(proyectoInicial || {
        titulo: '',
        descripcion: '',
        completada: false,
        fecha_vencimiento: '',
        prioridad: 'media',
        asignado_a: '',
        categoria: '',
        costo_proyecto: 0,
        pagado: false
    });

    const [error, setError] = useState(null); // Estado para manejar errores

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProyecto({ ...proyecto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validar que la fecha de vencimiento sea futura
            if (proyecto.fecha_vencimiento && new Date(proyecto.fecha_vencimiento) < new Date()) {
                setError('La fecha de vencimiento no puede ser anterior a la fecha actual.');
                return;
            }

            if (proyecto.id) {
                // Actualizar proyecto existente
                await axios.put(`${API_URL}/${proyecto.id}`, proyecto);
            } else {
                // Crear nuevo proyecto
                await axios.post(API_URL, proyecto);
            }
            onSave(); // Llamar a onSave después de guardar
            setError(null); // Resetear error en caso de éxito
        } catch (error) {
            console.error('Error al guardar el proyecto:', error);
            setError('Error al guardar el proyecto. Intente nuevamente.'); // Actualizar el estado de error
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
            <input
                type="text"
                name="titulo"
                value={proyecto.titulo}
                onChange={handleChange}
                placeholder="Título"
                required
            />
            <textarea
                name="descripcion"
                value={proyecto.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
            />
            <input
                type="date"
                name="fecha_vencimiento"
                value={proyecto.fecha_vencimiento}
                onChange={handleChange}
            />
            <select name="prioridad" value={proyecto.prioridad} onChange={handleChange}>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
            </select>
            <input
                type="number"
                name="costo_proyecto"
                value={proyecto.costo_proyecto}
                onChange={handleChange}
                placeholder="Costo del Proyecto"
                min="0"
            />
            <button type="submit">Guardar Proyecto</button>
        </form>
    );
};

export default ProyectoForm;
