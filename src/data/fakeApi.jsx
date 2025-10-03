const products = [
    {
        id: 1,
        title: 'Rostro de Mujer',
        autor: "Tsukiko-Kiyomidzu",
        description: 'Pintura Abstracta',
        imageUrl: 'images/1.png',
        price: 300,
        stock: 3
    },

    {
        id: 2,
        title: 'Naturaleza Muerta',
        autor: "Jill Wellington",
        description: 'Descripción breve',
        imageUrl: 'images/2.png',
        price: 500,
        stock: 2
    },

    {
        id: 3,
        title: 'Cat al óleo',
        autor: "Bianca Van Dijk",
        description: 'Descripción breve',
        imageUrl: 'images/cat.png',
        price: 450,
        stock: 10
    },

    {
        id: 4,
        title: 'Doggy',
        autor: "John Doe",
        description: 'Descripción breve',
        imageUrl: 'images/Dog.png',
        price: 600,
        stock: 8
    },

    {
        id: 5,
        title: 'Landscape',
        autor: "Jane Smith",
        description: 'Descripción breve',
        imageUrl: 'images/landscape.png',
        price: 700,
        stock: 12
    },

    {
        id: 6,
        title: 'Shadows',
        autor: "Pintura Anónima",
        description: '',
        imageUrl: 'images/shadows.png',
        price: 800,
        stock: 1
    },

    {
        id: 7,
        title: 'Foxy',
        autor: "Michael Brown",
        description: 'Descripción breve',
        imageUrl: 'images/fox.png',
        price: 900,
        stock: 3
    },
    {
        id: 8,
        title: 'Ewe and Me Drawing',
        autor: "Soo Beng Lim",
        description: 'Australian Sheep drawing',
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
