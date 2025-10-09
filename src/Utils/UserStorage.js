// estaria bueno hacer un backend para utilizar una db y registrar realemente el usuario

const USER_STORAGE_KEY = "users_db";


export const getAllUsers = () =>
{
    const storedUsers = localStorage.getItem(USER_STORAGE_KEY);

    return storedUsers ? JSON.parse(storedUsers) : {};
};

// Función para guardar la lista completa de usuarios
const saveAllUsers = (users) =>
{
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

// registro
export const registerUser = ({ email, password }) =>
{
    const users = getAllUsers();

    // 1. si existe no lo dejo seguir
    if (users[email])
    {
        throw new Error("El email ya está registrado.");
    }

    // 2. Agregar el nuevo usuario (usando el email como clave)
    users[email] = { password, email };

    // 3. Guardar la DB actualizada es LocalStorage pero bueno enel futuro sera db
    saveAllUsers(users);
};

// Aca verifico el login
export const verifyLogin = ({ email, password }) =>
{
    const users = getAllUsers();


    const userRecord = users[email];
    if (!userRecord)
    {
        throw new Error("Usuario no encontrado.");
    }

    // 2. Verificar la contraseña
    if (userRecord.password !== password)
    {
        throw new Error("Contraseña incorrecta.");
    }

    const { password: _, ...userData } = userRecord;
    return userData; // { email: 'gus@mail.com' }
};