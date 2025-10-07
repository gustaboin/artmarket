# 🎨 Arte Marketplace

Un **marketplace de arte digital** hecho en **React**.  
Permite explorar obras destacadas, ver detalles en un **modal** o página dedicada, agregar productos a un **carrito de compras** y finalizar con un **checkout** (simulado).

![Vista previa](public/images/home.png)

---

## ✨ Características

- 📌 **Listado de obras** con diseño moderno y responsivo.

- 🖼️ **Modal rápido** con descripción, imagen y botón de compra.

![Vista previa](public/images/modal.png)

- 🔍 **Página de detalle** para cada obra.

- 🛒 **Carrito de compras**:
  - Agregar y eliminar productos.
  - Control de cantidades (+ / -).
  - Subtotales y total dinámico.
  - Persistencia en `localStorage`.

![vista previa](public/images/cart.png)

- 💳 **Checkout simulado**:
  - Formulario con validaciones realistas.
  - Limpieza del carrito al completar la compra.

![vista previa](public/images/pagar.png)

- 📱 **Responsive design**: adaptado a mobile y desktop.

![Vista previa](public/images/mobile.png)

- 🎚️ **Carrusel de productos** con navegación lateral.

---

## 🚀 Tecnologías utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) para la navegación
- Context API para el **estado global del carrito**
- [React Modal](https://www.npmjs.com/package/react-modal) para el popup de producto
- CSS puro con **media queries** para mobile-ready

---

## 📂 Estructura del proyecto

![Vista previa](public/images/estructura.png)

## 📦 Instalación y uso

Cloná este repo:

```bash
git clone https://github.com/tuusuario/art-marketplace.git

```

```bash

cd art-marketplace

npm install

npm run dev

Abrí en tu navegador >> http://localhost:5173
```

## Visualiza el proyecto

- **[ArtMarket](https://gustaboin.github.io/artmarket/)** - Una Divertida App de Arte para que puedas vender tus obras! 🌐
