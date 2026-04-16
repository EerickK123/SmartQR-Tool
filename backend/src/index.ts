/*
TO DO:

- [X] Crear un usuario root por defecto al crear la base de datos (con rol 3 y contraseña 1234567890)
- [X] Mejorar la separacion de responsabilidades entre el controller, service y model en el login
- [X] guardar en el historial el inicio de sesion 
- [X] Crear el crud de usuarios
  - [X] Implemetar la funcion de buscar usuarios por documento
  - [X] implementar la funcion de eliminar varios usuarios a la vez

*/  

import {app} from "./app";

function main() {
  const port = Number(process.env.PORT || 4000);
  app(port);
}

main();