import React, { useState } from "react";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { verifyLogin } from "../utils/userStorage";
import { toast } from "react-toastify";
import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [form, setForm] = useState({ usuario: "", password: "" });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.usuario.trim() || !form.password.trim()) {
      toast.error("Por favor, completa los campos.");
      return;
    }

  try {
    // Verificar credenciales
    const userData = verifyLogin({
      email: form.usuario,
      password: form.password,
    });

    login(userData);
      const email = userData.email.split('@')[0]; // corto el nombre detras del arroba para hacerlo mas personalizado
      toast.success("Bienvenido " + email);


    //  mejoras de visualizacion segun tl tipo de usuario si es admin dashboard si No es admin cart o home

    // 1) Si es ADMIN → dashboard
    if (userData.role === "admin") {
      navigate("/dashboard");
      return;
    }

    // 2) Si venía desde el carrito → checkout
    if (location.state?.from === "cart") {
      navigate("/checkout");
      return;
    }

    // 3) Si el carrito NO está vacío → ir al carrito
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length > 0) {
      navigate("/cart");
      return;
    }

    // 4) Todo lo demás → home
    navigate("/");

  } catch (err) {
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

        <button type="submit" className="btn-login">
          Ingresar
        </button>
      </form>
      <p className="credentials"> Adminuser: <b>admin@artmarket.com</b> password: <b>1234</b></p>
      <p className="register-link">
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>
    </div>
  );
};

export default Login;
