
import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/userStorage"; // Importamos la utilidad
// uso el mismo css que para el login
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../Styles/Login.css";
const Register = () =>
{
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "",role:"" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { isAuthenticated } = useAuth();

    if (isAuthenticated)
    {
        return <Navigate to="/" replace />;
    }

    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password)
        {
            toast.error("Completa todos los campos");
            return;
        }

        try
        {
            // Llama a la lógica de registro
            registerUser(form);

            toast.success("Registro exitoso!");
            // Redirigir al login después de un breve momento
            setTimeout(() =>
            {
                navigate("/login");
            }, 1500);

        } catch (err)
        {
            // Errores de la utilidad ( 'El email ya está registrado')
            setError(err.message);
        }
    };

    return (
        <div className="register-page">
            <h1>Crear Cuenta</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                />

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <button type="submit" className="btn-login">Registrarme</button>
            </form>
            <p className="register-link">
                ¿ya tenés cuenta? <Link to="/login">Ir a Login</Link>
            </p>
        </div>
    );
};

export default Register;