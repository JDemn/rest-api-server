# ACERCA DEL PROYECTO

Este proyecto es un servidor REST desarrollado con Node.js (versión `20.13.1`) y npm (`10.5.2`). Utiliza el framework Express para manejar las rutas y las solicitudes. La base de datos utilizada para pruebas es MongoDB. El servidor por defecto escucha en el puerto `8083`.

## TECNOLOGÍAS USADAS

- **Node.js**: Lenguale principal.
- **MongoDB**: Base de datos NoSQL utilizada para el almacenamiento.
- **Docker**: Para contenedorización (versión 25.0.3).

## CÓMO LEVANTAR EL PROYECTO

### Usando npm

Para levantar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/JDemn/rest-api-server.git
    ```

2. Navega a la carpeta del proyecto:
    ```sh
    cd rest-api-server
    ```

3. Instala las dependencias:
    ```sh
    npm install
    ```

4. Actualiza la rama principal:
    ```sh
    git pull origin main
    ```
5. Crea tu archivo de variables de ambiente `.env` sobre la carpeta raíz del proyecto:
    **DB_NAME**=Nombre de tu base de datos
    **MONGODB_CNN**=Conexión de tu base de datos de mongo db
    **SECRETORPRIVATEKEY**=Tu clave privada para la firma de tokens
    **GHIBLI_URL**=https://ghibliapi.vercel.app

6. Inicia el servidor en modo desarrollo:
    ```sh
    npm run dev
    ```

### Usando Docker

Para levantar el proyecto usando Docker, asegúrate de tener Docker instalado y corriendo. Luego, sigue estos pasos:

1. Verifica la versión de Docker:
    ```sh
    docker --version
    ```
2. Crea tu archivo de variables de ambiente `.env` sobre la carpeta raíz del proyecto:
    **DB_NAME**=Nombre de tu base de datos
    **MONGODB_CNN**=Conexión de tu base de datos de mongo db
    **SECRETORPRIVATEKEY**=Tu clave privada para la firma de tokens
    **GHIBLI_URL**=https://ghibliapi.vercel.app

3. Construye la imagen Docker:
    ```sh
    docker buildx build -t imageName . --load
    ```

4. Ejecuta el contenedor Docker y mapea el puerto `8083`:
    ```sh
    docker run -p 8083:8083 -e MONGODB_CNN=CadenaDeConexiónDeMongo -e SECRETORPRIVATEKEY=PrivateKeYVariable nombreDeLaImagen
    ```

## CÓMO INTERACTUAR CON LA APLICACIÓN

Para interactuar con la aplicación, sigue estos pasos:

1. Asegúrate de tener Postman instalado.
2. Abre Postman y configura un ambiente de pruebas.
3. Llama a los siguientes endpoints con la URL base: `http://localhost:8083`

## Endpoints de la Aplicación

### `/api/user/create`

**Descripción**: Crea un nuevo usuario en el sistema.

**Método**: `POST`

**Cuerpo de la Solicitud**:

```json
    {
        "name" : "",
        "surnames" : "",
        "email":"",
        "password" : "",
        "role" : ""
    }
```
### `/api/user/all`
**Descripción**: Obtiene todos los usuarios.
**Método**: `GET`

**params** Parametros de búsqueda
`desde` : Por defecto busca desde la colección `0` .
`limite`: Trae hasta la colección `20` por defecto.

**Respuesta:**
-200 OK: Lista de usuarios.
-500 Internal Server Error: Error al obtener la lista de usuarios.

### `/api/auth/login`

**Descripción**: Autentica a un usuario y devuelve un token JWT.
**Método**: `POST`

**Cuerpo de la Solicitud**:

```json
    {
    "email" : "",
    "password" : ""
}
```

### `api/user/:id`
**Descripción**: Obtiene los detalles de un usuario específico.
**Método**: `GET`

**Parámetros de Ruta:**

`id`: ID del usuario (requerido)
Respuesta:

**200 OK**: Detalles del usuario.
**404 Not Found**: Usuario no encontrado.

### `/api/user/update/:id`

**Descripción**: Actualiza la información de un usuario específico.
**Método**: `PUT`

`id`: ID del usuario (requerido)

**Cuerpo de la Solicitud**:

```json
    {
    ... Información del usuario a actualizar
}
```

### `/api/user/delete/:id`

**Descripción**: Elimina un usuario específico.
**Método**: `DELETE`

`id`: ID del usuario (requerido)

### `/api/ghibli/data`
**Descripción**: Obtiene datos de la API de Studio Ghibli según el rol del usuario autenticado.
**Método**: `GET`


### Notas:

**Los roles disponibles son :** `films`, `people`, `locations`, `species`, `vehicles`, y `admin`.

**Autenticación**: Todos los roles exceptuando el de crear usuario, requiren autenticación con JWT. El rol del usuario se usa para determinar el endpoint de Studio Ghibli a consultar.