import express from "express";
import ClienteController from "./controllers/clienteController";
import AnuncioController from "./controllers/anuncioController";
import PropagandaController from "./controllers/propagandaController";
import NotificacoesController from "./controllers/notificacoesController";

const routes = express.Router();

const clienteController = new ClienteController();
const propagandaController = new PropagandaController();
const anuncioController = new AnuncioController();
const notificacoesController = new NotificacoesController();

//clientes
routes.post("/clientes", clienteController.create);
routes.post("/clientess/", clienteController.find);
routes.get("/perfil/:id", clienteController.findById);
routes.post("/login", clienteController.login);

//anuncios
routes.post("/anuncios", anuncioController.create);
routes.post("/anuncioss/:id", anuncioController.find);
routes.post("/anunciosall/:id", anuncioController.findAllByUserId);
routes.delete("/anuncios/:id", anuncioController.delete);
routes.put("/anunciodestaque/:id", anuncioController.destacar);

//propagandas
routes.post("/propaganda", propagandaController.create);
routes.get("/propaganda", propagandaController.index);
routes.delete("/propaganda/:id", propagandaController.delete);
routes.put("/propagandaempresa/:id", propagandaController.updateEmpresa);
routes.put("/propagandadata/:id", propagandaController.updateDataExpiracao);
routes.put("/propagandaimage/:id", propagandaController.updateImagem);

//notificações
routes.post("/notificacoes", notificacoesController.create);
export default routes;
