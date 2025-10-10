// para personalizar el error 4041
import '../App.css';

const NotFound = () =>
{
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: "2rem", textAlign: "center", margin: '0 auto', maxWidth: '500px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#003366' }}>¡Ups! 😕</h1>
            <h3 style={{ fontSize: '1.25rem', color: '#333', marginBottom: '1rem' }}>
                La ruta que ingresaste no existe o no pudimos encontrar lo que buscabas.
            </h3>

            <a href="/">
                <img style={{ maxWidth: '300px', padding: '20px' }} src="public/images/underground.png" alt="error 404" />
            </a>

            <br />
            <a className='btn btn-primary' href="/" >Volver al inicio</a>
        </div >
    );
};

export default NotFound;
