import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function FormularioRegistro() {
    const toast = useRef(null);

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [perfil, setPerfil] = useState(null);
    const [terminos, setTerminos] = useState(false);
    const [errores, setErrores] = useState({});

    const opcionesPerfil = [
        { label: 'Desarrollador Frontend', value: 'frontend' },
        { label: 'Desarrollador Backend', value: 'backend' },
        { label: 'Diseñador UI/UX', value: 'uiux' },
        { label: 'Product Manager', value: 'pm' }
    ];

    const validarFormulario = () => {
        let erroresTemporales = {};

        if (!nombre.trim()) {
            erroresTemporales.nombre = 'El nombre es obligatorio.';
        }

        if (!correo.trim()) {
            erroresTemporales.correo = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(correo)) {
            erroresTemporales.correo = 'El formato del correo no es válido.';
        }

        if (!perfil) {
            erroresTemporales.perfil = 'Por favor, selecciona tu perfil.';
        }

        if (!terminos) {
            erroresTemporales.terminos = 'Debes aceptar los términos.';
        }

        setErrores(erroresTemporales);
        return Object.keys(erroresTemporales).length === 0;
    };

    const enviarFormulario = (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            toast.current.show({
                severity: 'success',
                summary: 'Registro completado',
                detail: `¡Bienvenido al equipo, ${nombre}!`,
                life: 3000
            });

            setNombre('');
            setCorreo('');
            setPerfil(null);
            setTerminos(false);
            setErrores({});
        } else {
            toast.current.show({
                severity: 'error',
                summary: 'Formulario inválido',
                detail: 'Corrige los errores señalados en pantalla.',
                life: 3000
            });
        }
    };

    return (
        <div className="flex justify-content-center">
            <Toast ref={toast} />

            <Card title="Registro de Nuevo Miembro" className="w-full max-w-30rem shadow-2 border-round">
                <form onSubmit={enviarFormulario} className="flex flex-column gap-3">
                    
                    <div className="flex flex-column gap-2">
                        <label htmlFor="nombre" className="font-semibold text-sm">Nombre Completo</label>
                        <InputText 
                            id="nombre" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            placeholder="Ej: Carlos Santana"
                            className={errores.nombre ? 'p-invalid' : ''} 
                        />
                        {errores.nombre && <small className="p-error">{errores.nombre}</small>}
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="correo" className="font-semibold text-sm">Correo Electrónico</label>
                        <InputText 
                            id="correo" 
                            value={correo} 
                            onChange={(e) => setCorreo(e.target.value)} 
                            placeholder="Ej: correo@ejemplo.com"
                            className={errores.correo ? 'p-invalid' : ''} 
                        />
                        {errores.correo && <small className="p-error">{errores.correo}</small>}
                    </div>

                    <div className="flex flex-column gap-2">
                        <label htmlFor="perfil" className="font-semibold text-sm">Perfil Profesional</label>
                        <Dropdown 
                            id="perfil" 
                            value={perfil} 
                            options={opcionesPerfil} 
                            onChange={(e) => setPerfil(e.value)} 
                            placeholder="Selecciona un rol" 
                            className={errores.perfil ? 'p-invalid' : ''} 
                        />
                        {errores.perfil && <small className="p-error">{errores.perfil}</small>}
                    </div>

                    <div className="flex flex-column gap-2">
                        <div className="flex align-items-center gap-2 mt-2">
                            <Checkbox 
                                inputId="terminos" 
                                checked={terminos} 
                                onChange={(e) => setTerminos(e.checked)} 
                                className={errores.terminos ? 'p-invalid' : ''}
                            />
                            <label htmlFor="terminos" className="text-sm cursor-pointer select-none">Acepto los términos de servicio</label>
                        </div>
                        {errores.terminos && <small className="p-error">{errores.terminos}</small>}
                    </div>

                    <Button type="submit" label="Registrar Miembro" icon="pi pi-check" className="mt-3 w-full" />
                </form>
            </Card>
        </div>
    );
}