import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function GraficaVentas() {
    // Estados independientes para cada gráfica
    const [datosBarras, setDatosBarras] = useState({});
    const [opcionesBarras, setOpcionesBarras] = useState({});

    const [datosDona, setDatosDona] = useState({});
    const [opcionesDona, setOpcionesDona] = useState({});

    useEffect(() => {
        // Colores del tema activo
        const estiloDocumento = getComputedStyle(document.documentElement);
        const colorTexto = estiloDocumento.getPropertyValue('--text-color') || '#ffffff';
        const colorTextoSecundario = estiloDocumento.getPropertyValue('--text-color-secondary') || '#8b9bb4';
        const colorBorde = estiloDocumento.getPropertyValue('--surface-border') || '#374151';

        // 1. CONFIGURACIÓN DE GRÁFICA DE BARRAS (Ventas)
        const datosBarra = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
            datasets: [
                {
                    label: 'Ventas 2025 (K$)',
                    backgroundColor: '#06b6d4', // Cyan
                    borderColor: '#06b6d4',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Ventas 2026 (K$)',
                    backgroundColor: '#3b82f6', // Azul
                    borderColor: '#3b82f6',
                    data: [5, 8, 10, 8, 9]
                }
            ]
        };

        const opcionesBarra = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: { color: colorTexto }
                }
            },
            scales: {
                x: {
                    ticks: { color: colorTextoSecundario },
                    grid: { color: colorBorde }
                },
                y: {
                    ticks: { color: colorTextoSecundario },
                    grid: { color: colorBorde }
                }
            }
        };

        // 2. CONFIGURACIÓN DE GRÁFICA CIRCULAR (Distribución de productos)
        const datosCirculo = {
            labels: ['Electrónica', 'Ropa', 'Hogar', 'Otros'],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    backgroundColor: ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b'],
                    hoverBackgroundColor: ['#22d3ee', '#60a5fa', '#34d399', '#fbbf24']
                }
            ]
        };

        const opcionesCirculo = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true, // Cambia los cuadros por puntos en la leyenda
                        color: colorTexto
                    }
                }
            }
        };

        setDatosBarras(datosBarra);
        setOpcionesBarras(opcionesBarra);
        setDatosDona(datosCirculo);
        setOpcionesDona(opcionesCirculo);
    }, []);

    return (
        <div className="grid">
            {/* Gráfica de Barras (Ocupa 8 de 12 columnas en pantallas grandes) */}
            <div className="col-12 lg:col-8">
                <div className="card shadow-2 border-round p-3">
                    <h3 className="m-0 mb-4">Comparativa de Ventas Mensuales</h3>
                    <Chart type="bar" data={datosBarras} options={opcionesBarras} style={{ height: '350px' }} />
                </div>
            </div>

            {/* Gráfica de Dona (Ocupa 4 de 12 columnas en pantallas grandes) */}
            <div className="col-12 lg:col-4">
                <div className="card shadow-2 border-round p-3 flex flex-column align-items-center">
                    <h3 className="m-0 mb-4 align-self-start">Distribución por Categoría</h3>
                    <Chart type="doughnut" data={datosDona} options={opcionesDona} style={{ width: '100%', maxWidth: '260px' }} />
                </div>
            </div>
        </div>
    );
}