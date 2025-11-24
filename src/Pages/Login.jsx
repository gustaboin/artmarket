import React, { useState } from "react";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { verifyLogin } from "../utils/userStorage";
import Register from "./Register";
import "../Styles/Login.css";

const Login = () =>
{
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();

    const [form, setForm] = useState({ usuario: "", password: "", role:"" });
    const [error, setError] = useState("");

    /******** 10-10 agrego esto x si el usuario navegando escribe /login lo mando al inicio  ---> agregar en register tbnn */
    if (isAuthenticated)
    {
        return <Navigate to="/" replace />;
    }

    /* comento esta linea ya que el 10-10 lo cambie x navigate y Link
    const handleGoToRegister = () =>
    {
        navigate("/register"); // Asumiendo que tu ruta de registro es /register
    };

    */

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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <button type="submit" className="btn-login">
                        Ingresar
                    </button>
                </div>
            </form>
            <p className="register-link">
                ¿No tenés cuenta? <Link to="/register">Registrate</Link>
            </p>
        </div>
    );
};

export default Login;