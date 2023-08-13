import { assert } from 'chai';
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../app.js";

chai.use(chaiHttp);

let servidor = app.listen(3000);


describe("Validacion de ENDPOINT find all animes", () => {

    it("validar codigo de respuesta sea un 200, respuesta contenga objeto animes que sea un array", (done) => {
        chai
            .request(servidor)
            .get("/api/v1/animes")
            .end((err, res) => {

                //console.log(res.body);
                let respuesta = res.body;
                assert.equal(res.status, 200, "codigo de estado de respuesta no coincide con 200")
                assert.isArray(respuesta.animes, "Respuesta no es un array");
                done();
            });


    });
});