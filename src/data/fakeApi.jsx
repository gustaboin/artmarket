const products = [
    {
        id: 1,
        title: 'Rostro de Mujer',
        autor: "Tsukiko-Kiyomidzu",
        description: 'Pintura Abstracta',
        imageUrl: '../src/assets/images/1.png',
        price: 300
    },

    {
        id: 2,
        title: 'Naturaleza Muerta',
        autor: "Jill Wellington",
        description: 'Descripción breve',
        imageUrl: '../src/assets/images/2.png',
        price: 500
    },

    {
        id: 3,
        title: 'Cat al óleo',
        autor: "Bianca Van Dijk",
        description: 'Descripción breve',
        imageUrl: '../src/assets/images/cat.png',
        price: 450
    },

    {
        id: 4,
        title: 'Doggy',
        autor: "John Doe",
        description: 'Descripción breve',
        imageUrl: '../src/assets/images/Dog.png',
        price: 600
    },

    {
        id: 5,
        title: 'Landscape',
        autor: "Jane Smith",
        description: 'Descripción breve',
        imageUrl: '../src/assets/images/landscape.png',
        price: 700
    },

    {
        id: 6,
        title: 'Isabel Adjani',
        autor: "Fotograma Anonimo",
        description: 'Possession: Filme de Terror Piscologico del Director Polaco Andrzej Zulawski',
        imageUrl: '../src/assets/images/possession.png',
        price: 800
    },

    {
        id: 7,
        title: 'Foxy',
        autor: "Michael Brown",
        description: 'Descripción breve',
        imageUrl: '../src/assets/images/fox.png',
        price: 900
    },
    {
        id: 8,
        title: 'Ewe and Me Drawing',
        autor: "Soo Beng Lim",
        description: 'Australian Sheep drawing',
        imageUrl: '../src/assets/images/sheep.png',
        price: 450
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
        console.log("🆔 Buscando producto con id:", id);
        console.log("📦 IDs disponibles:", products.map(p => p.id));
        const product = products.find(p => p.id === Number(id));
        setTimeout(() =>
        {
            if (product) resolve(product);
            else reject("Producto no encontrado");
        }, 1000);
    });
}
