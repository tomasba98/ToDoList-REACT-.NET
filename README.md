# ToDoList REAST API | React + .Net

Este proyecto es una aplicación web que proporciona funcionalidades básicas para la gestión de listas de tareas y usuarios, con un enfoque en la seguridad a través de la autenticación basada en tokens. A continuación se detallan las principales características y tecnologías utilizadas.

## Características principales

- **CRUD de Listas de Tareas:** La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las listas de tareas, lo que permite a los usuarios gestionar sus actividades de manera eficiente.

- **Autenticación de Usuarios:** La aplicación implementa un sistema de autenticación de usuarios mediante tokens JWT (JSON Web Tokens), lo que garantiza la seguridad de las operaciones y protege los datos sensibles.

- **Clase "GenericDao" y  "GenericService":** Se ha implementado una clase "GenericDao" para el acceso y manipulación de objetos en la base de datos de forma templatizada. Además, se ha desarrollado un servicio genérico "GenericService" para operaciones comunes en los diferentes tipos de objetos.

## Tecnologías utilizadas

- **Base de Datos:** PostgreSQL se utiliza como sistema de gestión de base de datos para almacenar la información de las listas de tareas y los usuarios.

- **ASP.NET Core:** El backend de la aplicación está desarrollado utilizando ASP.NET Core, un framework de desarrollo web de código abierto de Microsoft.

- **Entity Framework Core:** Se utiliza Entity Framework Core como ORM (Object-Relational Mapper) para interactuar con la base de datos desde la aplicación ASP.NET Core.

- **Autenticación JWT:** Se emplean tokens JWT para la autenticación de usuarios, lo que proporciona un método seguro y eficiente para la gestión de sesiones.

- **Swagger:** Se ha integrado Swagger para generar documentación interactiva de la API, lo que facilita su comprensión y uso por parte de desarrolladores y usuarios.

---

