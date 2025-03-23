import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para mostrar carga

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validaciones del formulario
        if (!emailRegex.test(email)) {
            setMessage('El correo electrónico no es válido.');
            return;
        }
        if (!email || !password || !confirmPassword) {
            setMessage('Todos los campos son obligatorios.');
            return;
        }
        if (password.length < 6) {
            setMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            setIsLoading(true); // Indicar que está cargando

            // Enviar datos al backend
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password,
            });

            // Verifica si el registro fue exitoso
            setMessage('¡Registro exitoso!');
            console.log('Usuario registrado:', response.data);

            // Limpia el formulario tras registro exitoso
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            // Maneja los errores del backend
            if (error.response && error.response.status === 409) {
                setMessage('El correo ya está registrado.');
            } else {
                setMessage('Error al registrar el usuario. Intenta nuevamente.');
            }
            console.error('Error:', error.response ? error.response.data : error.message);
        } finally {
            setIsLoading(false); // Terminar la carga
        }
    };

    return (
        <div className="register container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading} // Deshabilita el botón mientras carga
                >
                    {isLoading ? 'Registrando...' : 'Registrar'}
                </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default Register;
