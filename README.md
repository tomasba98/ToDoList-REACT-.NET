# ToDoList REST API | React + .Net

Este proyecto es una aplicación web que proporciona funcionalidades básicas para la gestión de listas de tareas y usuarios, con un enfoque en la seguridad a través de la encriptacion de datos y el uso de tokens. A continuación se detallan las principales características y tecnologías utilizadas.

## Características principales

- **CRUD de Listas de Tareas:** La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las listas de tareas, lo que permite a los usuarios gestionar sus actividades de manera eficiente.

- **Autenticación de Usuarios:** La aplicación implementa un sistema de autenticación de usuarios, utilizando un algoritmo de encriptación(SHA-256) para las contraseñas y tokens JWT para la comunicacion con el cliente, lo que garantiza la seguridad de las operaciones y protege los datos sensibles.

- **Clase "GenericDao" y "GenericService":** Se ha implementado una clase "GenericDao" para el acceso y manipulación de objetos en la base de datos de forma templatizada. Además, se ha desarrollado un servicio genérico "GenericService" para operaciones comunes en los diferentes tipos de objetos.

## Tecnologías utilizadas

- **React:** Para el frontend de la aplicación se utiliza React.

- **Axios:** Axios se utiliza para realizar solicitudes HTTP desde el frontend de la aplicación hacia el backend, lo que facilita la comunicación entre el cliente y el servidor.

- **Base de Datos:** _PostgreSQL_, se utiliza como sistema de gestión de base de datos para almacenar la información de las listas de tareas y los usuarios.

- **ASP.NET Core:** El backend de la aplicación está desarrollado utilizando ASP.NET Core, un framework de desarrollo web de código abierto de Microsoft.

- **Entity Framework Core:** Se utiliza Entity Framework Core como ORM (Object-Relational Mapper) para interactuar con la base de datos desde la aplicación ASP.NET Core.

- **Swagger:** Se ha integrado Swagger para generar documentación interactiva de la API, lo que facilita su comprensión y uso por parte de desarrolladores y usuarios.

---
