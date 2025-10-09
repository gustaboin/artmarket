import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { verifyLogin } from "../utils/userStorage";
import Register from "./Register";
import "../Styles/Login.css";

const Login = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [form, setForm] = useState({ usuario: "", password: "" });
    const [error, setError] = useState("");

    const handleGoToRegister = () =>
    {
        navigate("/register"); // Asumiendo que tu ruta de registro es /register
    };

    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setError("");

        // ⚠️ Recomendación: Agregar una validación simple de campos vacíos aquí.
        if (form.usuario.trim() === "" || form.password.trim() === "")
        {
            setError("Por favor, ingresa tu email y contraseña.");
            return;
        }

        try
        {
            // Verificar las credenciales 
            const userData = verifyLogin({
                email: form.usuario,
                password: form.password,
            });


            login(userData);

            // Redirección
            if (location.state?.from === "cart")
            {
                navigate("/checkout");
            } else
            {
                navigate("/");
            }
        } catch (err)
        {

            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <h1>Iniciar sesión</h1>

            <form onSubmit={handleSubmit} className="login-form">

                <input
                    type="email"
                    name="usuario"
                    value={form.usuario}
                    onChange={handleChange}
                    placeholder="Tu mail"
                />

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="password"
                />

                {error && <p className="error">{error}</p>}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <button type="submit" className="btn btn-primary">
                        Ingresar
                    </button>
                    <button type="button" className="btn btn-success" onClick={handleGoToRegister}>
                        Registrarse
                    </button></div>
            </form>
        </div>
    );
};

export default Login;