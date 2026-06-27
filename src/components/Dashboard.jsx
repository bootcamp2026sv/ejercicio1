import React, { useState } from 'react';
import { Button } from 'primereact/button';
import Perfil from './Perfil';
import Actividades from './Actividades';

export default function Dashboard({ user, onLogout }) {
    // Control de la sección activa: 'perfil' o 'actividad'
    const [activeSection, setActiveSection] = useState('perfil');

    const renderContent = () => {
        switch (activeSection) {
            case 'perfil':
                return <Perfil />;
            case 'actividad':
                return <Actividades />;
            default:
                return <Perfil />;
        }
    };

    return (
        <div className="flex flex-column min-h-screen bg-gray-900 text-gray-100">
            {/* 1. BARRA SUPERIOR (HEADER) */}
            <header className="flex justify-content-between align-items-center p-3 surface-card border-bottom-1 border-gray-800 shadow-2">
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-prime text-cyan-400 text-3xl"></i>
                    <span className="font-bold text-xl">React Dashboard</span>
                </div>
                <div className="flex align-items-center gap-3">
                    <span>Usuario: <strong>{user}</strong></span>
                    <Button 
                        icon="pi pi-sign-out" 
                        label="Cerrar Sesión" 
                        severity="danger" 
                        size="small" 
                        onClick={onLogout} 
                    />
                </div>
            </header>

            {/* 2. LAYOUT DEL CUERPO (MENÚ Y CONTENIDO) */}
            <div className="flex flex-grow-1">
                
                {/* BARRA LATERAL (SIDEBAR) */}
                <nav className="w-15rem surface-card border-right-1 border-gray-800 p-3 flex flex-column gap-2">
                    <span className="text-500 font-semibold text-xs uppercase mb-2">Secciones</span>
                    <Button 
                        label="Mi Perfil" 
                        icon="pi pi-user" 
                        onClick={() => setActiveSection('perfil')}
                        className={`justify-content-start text-left w-full ${activeSection === 'profile' ? 'p-button-primary' : 'p-button-text text-gray-400'}`}
                    />
                    <Button 
                        label="Actividades" 
                        icon="pi pi-calendar" 
                        onClick={() => setActiveSection('actividad')}
                        className={`justify-content-start text-left w-full ${activeSection === 'activity' ? 'p-button-primary' : 'p-button-text text-gray-400'}`}
                    />
                </nav>

                {/* 3. SECCIÓN PRINCIPAL DONDE SE CARGAN LOS SUBCOMPONENTES */}
                <main className="flex-grow-1 p-4 bg-gray-900 overflow-y-auto">
                    <div className="surface-card border-round p-4 shadow-2 min-h-full">
                        {renderContent()}
                    </div>
                </main>

            </div>
        </div>
    );
}
