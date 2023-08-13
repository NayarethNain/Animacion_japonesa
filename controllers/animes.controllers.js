import fs from "fs/promises";
import { v4 as uuid } from "uuid";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let pathAnimes = path.resolve(__dirname, "../database/animes.json")

//listar todos los animes
export const findAll = async (req, res) => {
    try {
        let data = await fs.readFile(pathAnimes, "utf8");
        data = JSON.parse(data);
        console.log(data);
        res.status(200).json({ code: 200, message: "OK", animes: data.animes })
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Error al leer los Animes de la bbdd" })
    }
};


//filtrar por id
export const findByPk = async (req, res) => {
    let id = req.params.id;
    try {
        let data = await fs.readFile(pathAnimes, "utf8");
        data = JSON.parse(data);

        let animeBuscado = data.animes.find(anime => anime.id == id);

        if (!animeBuscado) return res.status(404).json({ code: 404, message: `no existe en bbdd un anime con el ID ${id}` })

        //console.log(data);

        res.status(200).json({
            code: 200,
            message: "OK",
            anime: animeBuscado

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al leer el anime con ID:" + id,
        });
    }
};

// crear nuevo anime
export const create = async (req, res) => {
    try {
        let { nombre, genero, año, autor } = req.body;
        console.log(nombre, genero, año, autor);
        let nuevoAnime = {
            id: uuid().slice(0, 2),
            nombre,
            genero,
            año,
            autor
        };
        console.log(nuevoAnime);
        let data = await fs.readFile(pathAnimes, "utf8");
        data = JSON.parse(data);
        data.animes.push(nuevoAnime);
        await fs.writeFile(pathAnimes, JSON.stringify(data, null, 2), "utf8");

        res.status(201).json({
            code: 201,
            message: `Anime creado con Exito con ID: ${nuevoAnime.id} `,
            anime: nuevoAnime,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al crear el nuevo anime:"
        });
    }
};


//Eliminar anime

export const deleteAnime = async (req, res) => {
    let id = req.params.id;
    try {
        let data = await fs.readFile(pathAnimes, "utf8");
        data = JSON.parse(data);

        let index = data.animes.findIndex(anime => anime.id == id);

        if (index < 0) return res.status(404).json({ code: 404, message: "Anime no encontrado" })


        let animeEliminado = data.animes.splice(index, 1);

        await fs.writeFile(pathAnimes, JSON.stringify(data, null, 2), "utf8");


        res.status(200).json({
            code: 200,
            message: "Anime eliminado con exito con ID: " + id,
            data: animeEliminado,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al eliminar el anime con ID:" + id,
        });
    }
};


//Actualizar anime
export const update = async (req, res) => {
    let id = req.params.id;
    try {
        let { nombre, genero, año, autor } = req.body;


        let data = await fs.readFile(pathAnimes, "utf8");
        data = JSON.parse(data);

        let animeBuscado = data.animes.find(anime => anime.id == id);

        if (!animeBuscado) return res.status(404).json({ code: 404, message: "Anime que desea modificar no encontrado" })

        animeBuscado.nombre || animeBuscado.nombre;
        animeBuscado.genero = genero || animeBuscado.genero;

        await fs.writeFile(pathAnimes, JSON.stringify(data, null, 2), "utf8");

        res.status(201).json({
            code: 201,
            message: `Anime modificado con Exito con id ${id} `,
            anime: animeBuscado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al modificar anime con ID:" + id,
        });
    }
}