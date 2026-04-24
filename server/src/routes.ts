import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { criarCalcado, lerCalcado, atualizarCalcado, deletarCalcado} from "./controllers/CalcadosController";

const routes = express.Router();

routes.get("/users", readAllUsers);
routes.post("/calcado", criarCalcado);
routes.get("/calcado", lerCalcado);
routes.patch("/calcado/:id", atualizarCalcado);
routes.delete("/calcado/:id", deletarCalcado);
export default routes;
