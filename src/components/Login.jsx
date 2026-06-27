import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '1234') {
            setError('');
            onLogin(username);
        } else {
            setError('Credenciales incorrectas (admin / 1234)');
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-gray-900 p-3">
            <Card title="Ingresar al Sistema" className="w-full max-w-25rem shadow-8 border-round p-3">
                <form onSubmit={handleLogin} className="flex flex-column gap-3">
                    <div className="flex flex-column gap-2">
                        <label htmlFor="username">Usuario</label>
                        <InputText 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Escribe admin"
                            className="w-full"
                        />
                       

                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="password">Contraseña</label>
                        <Password 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            toggleMask 
                            feedback={false}
                            placeholder="Escribe 1234"
                            inputClassName="w-full"
                            className="w-full"
                        />
                    </div>
                    {error && <small className="p-error text-center">{error}</small>}
                    <Button type="submit" label="Entrar" icon="pi pi-sign-in" className="mt-2 w-full" />
                </form>
            </Card>
        </div>
    );
}
