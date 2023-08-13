import express from "express";

//Importacion de rutas

import animesRoutes from "./routes/animes.routes.js";

const app = express();


//MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));







//RUTAS - ENDPOINTS

app.use("/api/v1/animes", animesRoutes);
//localhost:3000/api/v1/animes/2


/*const PORT = 3000;
app.listen(PORT, () => {
    console.log("servidor escuchando en puerto 3000" + PORT);
});*/

/*app.get("/",(req, res) => {
    res.send("Página pricipal")
})*/

export default app;