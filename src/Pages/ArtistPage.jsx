import React from 'react';
// aun no esta desarrollada la ruta para la descripcion del artista
const ArtistPage = ({ artist }) =>
{
    return (
        <div className="artist-profile">
            <h1>{artist.name}</h1>
            <p>{artist.bio}</p>
            <div className="gallery">
                {artist.artworks.map(artwork => (
                    <img key={artwork.id} src={artwork.imageUrl} alt={artwork.title} />
                ))}
            </div>
        </div>
    );
};

export default ArtistPage;
