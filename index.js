import app from "./app.js"


const main = () => {
    const PORT = 3000;
    app.listen (PORT, () => {
        console.log("servidor escuchando en puerto 3000" + PORT);
    });
}

main()