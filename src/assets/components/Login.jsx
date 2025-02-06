import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Todos los campos son obligatorios.');
            return;
        }
        if (password.length < 6) {
            setMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        setMessage('¡Login exitoso!');
    };

    return (
        <div className="login container mt-5">
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="form-group">
                    <label htmlFor='email'>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='password'>Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default LoginPage;
