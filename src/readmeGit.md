# install

npm install gh-pages --save-dev

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
base: '/NOMBRE-DEL-REPO/' // 👈 importante
})

# en el package.json

"homepage": "https://TU_USUARIO.github.io/artmarket", aca los datos del repo
"scripts": {
"dev": "vite",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview",
/_ agregar estas dos lineas _/
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
}

# para compilar y ejecutar

npm run build
npm run dev

# otro dato adicional para que funcionen las imagenes y las rutas

las imagenes tiene que estar en public images
<img src={`${import.meta.env.BASE_URL}/tu-imagen.jpg`} alt="..." />

// ver data que es la fakeAPi que arme solo va el nombre de la imagen

// otro problema le error de uft LF
warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
git config --global core.autocrlf false
