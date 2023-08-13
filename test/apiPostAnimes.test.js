import { assert } from 'chai';
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../app.js";

chai.use(chaiHttp);

let servidor = app.listen(3000);


describe("Validacion de ENDPOINT CREATE animes", () => {

    it("validar codigo de respuesta sea un 201, respuesta contenga una propiedad anime y contenga un object", (done) => {

        let anime = {
            nombre: "Sakura card captor",
            genero: "Mahō shōjo",
            año: "1996",
            autor: "CLAMP"
        }

        chai
            .request(servidor)
            .post("/api/v1/animes")
            .send({})
            .end((err, res) => {

                //console.log(res.body);
                let respuesta = res.body;
                assert.equal(
                    res.status,
                    201,
                    "codigo de estado de respuesta no coincide con 201"
                );


                assert.exists(respuesta.anime, "No existe propiedad anime en la respuesta");
               
                done();
            });


    });
});