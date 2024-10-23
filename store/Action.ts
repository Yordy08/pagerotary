import { useUserStore } from '~/store/main'; // Adjust the import path as necessary

interface LoginData {
    correo: string;
    contraseña: string;
}

export async function loginUser(data: LoginData)  {
    const userStore = useUserStore();
   console.log(data)

    try {
        const response = await fetch('/api/Usuarios/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const user = await response.json();
        if(user.usuario){
            userStore.setUser(user.usuario);
        }
        console.log(user)
        return user;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

}