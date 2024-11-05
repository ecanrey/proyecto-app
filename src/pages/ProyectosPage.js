// src/pages/ProyectosPage.js
import React, { useState } from 'react';
import ProyectoForm from '../components/ProyectoForm';
import ProyectoList from '../components/ProyectoList';

const ProyectosPage = () => {
    const [selectedProyecto, setSelectedProyecto] = useState(null);

    const handleSave = () => {
        setSelectedProyecto(null);
    };

    return (
        <div>
            <h1>Gestión de Proyectos</h1>
            <ProyectoForm proyectoInicial={selectedProyecto} onSave={handleSave} />
            <ProyectoList onEdit={setSelectedProyecto} />
        </div>
    );
};

export default ProyectosPage;
