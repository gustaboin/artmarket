
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/UserStorage"; // Importamos la utilidad

// uso el mismo css que para el login
import "../Styles/Login.css";

const Register = () =>
{
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
            setError("Por favor, completa todos los campos.");
            return;
        }

        try
        {
            // Llama a la lógica de registro
            registerUser(form);

            setSuccess("Registro exitoso! Redirigiendo al login...");
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

                <button type="submit" className="btn btn-Success">Registrarme</button>
            </form>
        </div>
    );
};

export default Register;