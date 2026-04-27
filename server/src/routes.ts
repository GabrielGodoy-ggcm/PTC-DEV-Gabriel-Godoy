import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { criarCalcado, lerCalcado, atualizarCalcado, deletarCalcado,  buscarTamanho, buscarMarca, contarPares } from "./controllers/CalcadosController";

const routes = express.Router();
//rotas do desafio normal
routes.get("/users", readAllUsers);
routes.post("/calcado", criarCalcado);
routes.get("/calcado", lerCalcado);
routes.get("/calcado/tamanho/:tamanho", buscarTamanho);
routes.get("/calcado/marca/:marca", buscarMarca);
routes.patch("/calcado/:id", atualizarCalcado);
routes.delete("/calcado/:id", deletarCalcado);
routes.get("/calcado/total", contarPares);

export default routes;
