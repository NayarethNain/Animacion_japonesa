import { Router } from 'express';
import {findAll, findByPk, create, deleteAnime, update } from "../controllers/animes.controllers.js"
const router = Router();


//Rutas

// Para Leer/listar todos los Animes de nuestra bbdd
router.get('/', findAll); 
//localhost:3000/api/v1/animes

// para filtrar anime por ID
router.get('/:id', findByPk);
//localhost:3000/api/v1/animes/2

//Crear un nuevo Anime
router.post('/', create);
//localhost:3000/api/v1/animes/80

//Eliminar animes por id
router.delete('/:id', deleteAnime);
//localhost:3000/api/v1/animes/80

//Actualizar anime
router.put('/:id', update);







export default router;