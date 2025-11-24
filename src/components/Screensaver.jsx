import React, { useEffect, useState } from "react";
import "./../styles/Screen.css";

// es un fondo de pantalla x inactividad que va mostrar las palabras que estan en el array y los colores que estan debajo de manera aleatoria

const palabras = [
    "Arte", "Óleo", "Escultura", "Renacimiento", "Surrealismo",
    "Color", "Forma", "Textura", "Luz", "Movimiento",
    "Abstracción", "Creatividad", "Inspiración", "Modernismo", "Cubismo"
];

const colores = ["#ff4d4d", "#ffd700", "#00ffff", "#ff66cc", "#66ff66", "#ff9966"];

const Screensaver = () =>
{
    const [show, setShow] = useState(false);

    useEffect(() =>
    {
        let timeout;

        const resetTimer = () =>
        {
            clearTimeout(timeout);
            setShow(false);
            timeout = setTimeout(() => setShow(true), 50000); //  segundos sin actividad
        };

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("scroll", resetTimer);

        resetTimer(); // inicia el contador al cargar

        return () =>
        {
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("scroll", resetTimer);
            clearTimeout(timeout);
        };
    }, []);

    if (!show) return null;

    return (
        <div className="screensaver">
            {palabras.map((palabra, i) => (
                <span
                    key={i}
                    className="palabra"
                    style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        fontSize: `${Math.random() * 2 + 1.2}rem`,
                        animationDelay: `${Math.random() * 5}s`,
                        color: colores[Math.floor(Math.random() * colores.length)]
                    }}
                >
                    {palabra}
                </span>
            ))}
        </div>
    );
};

export default Screensaver;
