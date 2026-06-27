import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Knob } from 'primereact/knob';
import { Button } from 'primereact/button';
import { addLocale } from 'primereact/api';
import { Chips } from "primereact/chips";
export default function Actividades() {
    
    const [date, setDate] = useState(new Date());
    const [progress, setProgress] = useState(15);
    const [value, setValue] = useState([]);

     addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    return (
        <Card title="Panel de Actividad" className="shadow-2 border-round">
            <div className="flex flex-column md:flex-row align-items-center justify-content-around gap-4">
                
                {/* Control del progreso usando Knob */}
                <div className="flex flex-column align-items-center gap-2">
                    <span className="font-semibold text-gray-400">Progreso del Día</span>
                    <Knob value={progress} onChange={(e) => setProgress(e.value)} valueColor="#06b6d4" rangeColor="#374151" />
                    <div className="flex gap-2">
                        <Button icon="pi pi-minus" className="p-button-rounded p-button-danger p-button-sm" onClick={() => setProgress(Math.max(0, progress - 10))} />
                        <Button icon="pi pi-plus" className="p-button-rounded p-button-success p-button-sm" onClick={() => setProgress(Math.min(100, progress + 10))} />
                    </div>
                </div>

                {/* Selección de fechas usando Calendar */}
                <div className="flex flex-column gap-2 w-full md:w-auto">
                    <span className="font-semibold text-gray-400">Seleccionar Fecha de Entrega</span>
                    <Calendar 
                        value={date} 
                        onChange={(e) => setDate(e.value)} 
                        inline 
                        locale='es'
                        showWeek
                    />
                    <Chips value={value} onChange={(e) => setValue(e.value)} separator="," />
                    
                    {/* MOSTRAMOS LA FECHA SELECCIONADA AQUÍ ABAJO */}
                    {date && (
                        <div className="text-center mt-2">
                            <span className="text-sm text-gray-400">Fecha seleccionada:</span>
                            <div className="text-cyan-400 font-bold text-lg mt-1">
                                {date.toLocaleDateString('es-ES', { dateStyle: 'long' })}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </Card>
    );
}
