import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

export default function Perfil() {
    const [rating, setRating] = useState(4);

    return (
        <Card title="Perfil del Desarrollador" className="shadow-2 border-round">
            <div className="flex flex-column align-items-center text-center gap-3">
                {/* Avatar oficial de PrimeReact */}
                <Avatar 
                    icon="pi pi-user" 
                    size="xlarge" 
                    shape="circle" 
                    className="bg-cyan-500 text-white" 
                />
                
                <div>
                    <h2 className="m-0">Admin </h2>
                    <p className="text-gray-400 m-1">Desarrollador React</p>
                    <Tag value="Activo" severity="success" className="mt-2" />
                </div>

                <div className="flex flex-column align-items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Valoración del Ejercicio:</span>
                    {/* Componente Rating oficial */}
                    <Rating value={rating} onChange={(e) => setRating(e.value)} cancel={false} />
                </div>

                <div className="flex gap-2 mt-3">
                    <Button label="Editar Perfil" icon="pi pi-user-edit" className="p-button-outlined p-button-sm" />
                    <Button label="Mensajes" icon="pi pi-envelope" className="p-button-sm" />
                </div>
            </div>
        </Card>
    );
}
