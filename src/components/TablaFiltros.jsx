import React, { useState,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
export default function TablaFiltros() {
    // Datos de ejemplo
        const [dates, setDates] = useState(null);

 const toast = useRef(null);
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
                toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://reactjs.org/';
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                //router.push('/fileupload');
            }
        }
    ];

    const save = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    };
    const [clientes] = useState([
        { id: 1, nombre: 'Juan Pérez', pais: 'España', empresa: 'Tech Solutions', estado: 'activo', fecha: '2026-01-15' },
        { id: 2, nombre: 'María Gómez', pais: 'México', empresa: 'Finanzas Globales', estado: 'pendiente', fecha: '2026-03-22' },
        { id: 3, nombre: 'Carlos López', pais: 'Argentina', empresa: 'Logística Sur', estado: 'inactivo', fecha: '2025-11-05' },
        { id: 4, nombre: 'Ana Rodríguez', pais: 'Colombia', empresa: 'Creativos Digitales', estado: 'activo', fecha: '2026-05-12' },
        { id: 5, nombre: 'Luis Martínez', pais: 'España', empresa: 'Alimentos del Sol', estado: 'activo', fecha: '2026-06-01' },
        { id: 6, nombre: 'Juan Pérez', pais: 'España', empresa: 'Tech Solutions', estado: 'activo', fecha: '2026-01-15' },
        { id: 7, nombre: 'María Gómez', pais: 'México', empresa: 'Finanzas Globales', estado: 'pendiente', fecha: '2026-03-22' },
        { id: 8, nombre: 'Carlos López 8', pais: 'Argentina', empresa: 'Logística Sur', estado: 'inactivo', fecha: '2025-11-05' },
        { id: 9, nombre: 'Ana Rodríguez 9', pais: 'Colombia', empresa: 'Creativos Digitales', estado: 'activo', fecha: '2026-05-12' },
        { id: 10, nombre: 'Luis Martínez 10', pais: 'España', empresa: 'Alimentos del Sol', estado: 'activo', fecha: '2026-06-01' }
    ]);

    // ESTADOS 
    const [valorFiltroGlobal, setValorFiltroGlobal] = useState('');
    const [filtros, setFiltros] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // FUNCIÓN: Maneja la escritura en la barra de búsqueda
    const alCambiarFiltroGlobal = (e) => {
        const valor = e.target.value;
        let _filtros = { ...filtros };
        _filtros['global'].value = valor;

        setFiltros(_filtros);
        setValorFiltroGlobal(valor);
    };

    // DISEÑO: Formatea la columna "Estado" para mostrar etiquetas (Tags) de colores
    const plantillaEstado = (fila) => {
        switch (fila.estado) {
            case 'activo':
                return <Tag value="Activo" severity="success" />;
            case 'pendiente':
                return <Tag value="Pendiente" severity="warning" />;
            case 'inactivo':
                return <Tag value="Inactivo" severity="danger" />;
            default:
                return <Tag value={fila.estado} />;
        }
    };

    // VISTA: Genera el componente de cabecera con el buscador
    const generarCabecera = () => {
        return (
            <div className="flex justify-content-between align-items-center gap-2 flex-wrap">
                <h3 className="m-0">Listado de Clientes</h3>
                <Button label="Submit" icon='pi pi-check' />
 <div className="card flex justify-content-center">
            <Toast ref={toast}></Toast>
            <SplitButton label="Save" icon="pi pi-plus" onClick={save} model={items} />
        </div>
          <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText 
                        value={valorFiltroGlobal} 
                        onChange={alCambiarFiltroGlobal} 
                        placeholder="Buscar cliente..." 
                        className="p-inputtext-sm"
                    />
                </span>
            </div>
        );
    };

    const cabecera = generarCabecera();

    return (
        <div className="card shadow-2 border-round">
            {/* 
              Las propiedades (props) de DataTable como value, paginator, rows, dataKey, etc., 
              deben mantenerse en inglés porque pertenecen a la API de PrimeReact. 
            */}
            <DataTable 
                value={clientes} 
                paginator 
                rows={8} 
                dataKey="id" 
                filters={filtros} 
                filterDisplay="menu"
                globalFilterFields={['nombre', 'pais', 'empresa', 'estado']} 
                header={cabecera} 
                emptyMessage="No se encontraron clientes."
                responsiveLayout="scroll"
            >
                <Column field="nombre" header="Nombre" sortable style={{ minWidth: '10rem' }} />
                <Column field="empresa" header="Empresa" sortable style={{ minWidth: '10rem' }} />
                <Column field="pais" header="País" sortable style={{ minWidth: '8rem' }} />
                <Column field="fecha" header="Fecha de Registro" sortable style={{ minWidth: '8rem' }} />
                <Column field="estado" header="Estado" body={plantillaEstado} sortable style={{ minWidth: '8rem' }} />
            </DataTable>
        </div>
    );
}
