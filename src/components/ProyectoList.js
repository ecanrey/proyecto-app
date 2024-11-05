// src/components/ProyectoList.js
import React, { useEffect, useState } from 'react';
import { getProyectos } from '../services/proyectoService';
import ProyectoForm from './ProyectoForm';

const ProyectoList = () => {
    const [proyectos, setProyectos] = useState([]);
    const [actualizando, setActualizando] = useState(false); // Variable para controlar el estado de actualización

    useEffect(() => {
        const fetchProyectos = async () => {
            const data = await getProyectos();
            setProyectos(data);
        };
        fetchProyectos();
    }, []);

    const handleUpdate = async (id, proyecto) => {
        setActualizando(true); // Comenzar la actualización
        // Lógica para actualizar el proyecto usando el servicio
        // Después de la actualización
        setActualizando(false); // Finalizar la actualización
    };

    return (
        <div>
            <h1>Lista de Proyectos</h1>
            {actualizando && <p>Actualizando proyecto...</p>} {/* Mostrar mensaje mientras se actualiza */}
            <ul>
                {proyectos.map((proyecto) => (
                    <li key={proyecto.id}>
                        {proyecto.titulo}
                        <button onClick={() => handleUpdate(proyecto.id, proyecto)}>Actualizar</button>
                    </li>
                ))}
            </ul>
            <ProyectoForm onSave={() => {/* Lógica para refrescar la lista de proyectos */}} />
        </div>
    );
};

export default ProyectoList;
