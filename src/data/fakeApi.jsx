const products = [
    {
        id: 1,
        title: 'Rostro de Mujer',
        autor: "Tsukiko-Kiyomidzu",
        description: 'Pintura abstracta que invita a la reflexión sobre la identidad femenina y la expresión emocional. A través de formas y colores, la obra captura la esencia de la figura femenina, evocando una sensación de misterio y vulnerabilidad',
        imageUrl: 'images/1.png',
        price: 300,
        stock: 3
    },

    {
        id: 2,
        title: 'Naturaleza Muerta',
        autor: "Jill Wellington",
        description: 'Una obra clásica que representa una naturaleza muerta con una impresionante atención al detalle. Cada objeto, desde la fruta hasta los utensilios, es cuidadosamente dispuesto para crear un equilibrio perfecto entre lo natural y lo artístico',
        imageUrl: 'images/2.png',
        price: 500,
        stock: 2
    },

    {
        id: 3,
        title: 'Cat al óleo',
        autor: "Bianca Van Dijk",
        description: 'Este óleo sobre lienzo captura la tranquilidad y el misterio de un gato en su entorno natural. Con un estilo detallado y suave, la obra transmite una sensación de paz y serenidad, invitando al espectador a perderse en la mirada profunda del animal',
        imageUrl: 'images/cat.png',
        price: 450,
        stock: 10
    },

    {
        id: 4,
        title: 'Doggy',
        autor: "John Doe",
        description: 'Una representación encantadora de un perro en un estilo moderno y expresivo. La obra transmite la lealtad y la alegría que suelen caracterizar a estos animales, utilizando colores vibrantes y formas dinámicas para darle vida al sujeto',
        imageUrl: 'images/Dog.png',
        price: 600,
        stock: 8
    },

    {
        id: 5,
        title: 'Landscape',
        autor: "Jane Smith",
        description: 'Un paisaje impresionante que captura la belleza natural de un entorno sereno. La obra refleja la tranquilidad de la naturaleza, desde las montañas hasta el cielo, con una paleta de colores cálidos y envolventes que invitan a la calma.',
        imageUrl: 'images/landscape.png',
        price: 700,
        stock: 12
    },

    {
        id: 6,
        title: 'Shadows',
        autor: "Pintura Anónima",
        description: 'Una obra intrigante y minimalista que juega con la luz y la sombra para crear una atmósfera misteriosa. La falta de detalles definidos y la relación entre las sombras invitan al espectador a interpretar la obra desde su perspectiva personal.',
        imageUrl: 'images/shadows.png',
        price: 800,
        stock: 1
    },

    {
        id: 7,
        title: 'Foxy',
        autor: "Michael Brown",
        description: 'Esta obra presenta una figura estilizada de un zorro, utilizando un enfoque moderno y lleno de energía. Con líneas limpias y colores contrastantes, captura la astucia y belleza de este animal, al mismo tiempo que explora las emociones que evoca.',
        imageUrl: 'images/fox.png',
        price: 900,
        stock: 3
    },
    {
        id: 8,
        title: 'Ewe and Me Drawing',
        autor: "Soo Beng Lim",
        description: 'Un dibujo delicado que muestra una oveja australiana y su cuidador en un entorno rural. A través de trazos suaves y detalles meticulosos, la obra transmite la conexión y la relación especial entre los seres humanos y los animales.',
        imageUrl: 'images/sheep.png',
        price: 450,
        stock: 6
    }

]

export function fetchProducts()
{
    return new Promise((resolve) =>
    {
        setTimeout(() =>
        {
            resolve(products);
        }, 1000); // simula 1 segundo de delay
    });
}

/*
export function fetchProductById(id)
{
    return new Promise((resolve, reject) =>
    {
        setTimeout(() =>
        {
            const product = products.find(p => p.id === id);
            if (product) resolve(product);
            else reject('Producto no encontrado');
        }, 1000);
    });
}
*/
export function fetchProductById(id)
{
    return new Promise((resolve, reject) =>
    {
        console.log("Buscando producto con id:", id);
        console.log("IDs disponibles:", products.map(p => p.id));
        const product = products.find(p => p.id === Number(id));
        setTimeout(() =>
        {
            if (product) resolve(product);
            else reject("Producto no encontrado");
        }, 1000);
    });
}
