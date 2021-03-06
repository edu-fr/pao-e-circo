import { Request, Response } from "express";
import Notificacoes from "models/NotificacaoTroca";
import { getConnection, getManager, getRepository } from "typeorm";
import Cliente from "../models/Cliente";

class ClienteController {
  async create(request: Request, response: Response) {
    const {
      name,
      cpf,
      endereco,
      cidade,
      estado,
      email,
      senha,
      dataNasc,
    } = request.body;

    var crypto = require("crypto");

    const clienteRepository = getRepository(Cliente);

    const checkClienteExists = await clienteRepository.findOne({
      where: { email },
    });

    if (checkClienteExists) {
      return response.status(400).json({ Erro: "E-mail já cadastrado" });
    }

    const passwaordHash = crypto
      .createHash("sha256")
      .update(senha)
      .digest("hex");

    const cliente = clienteRepository.create({
      name,
      cpf,
      dataNasc,
      estado,
      endereco,
      cidade,
      email,
      senha, //passwaordHash,
    });
    await clienteRepository.save(cliente);

    return response.json("funfou se pa em");
  }

  async findbyname(request: Request, response: Response) {
    const { name } = request.body;
    const entityManager = getManager();
    const someQuery = await entityManager.query(
      `
      SELECT id, name, endereco, cpf, cidade, estado, "dataNasc", email, senha, nota, "numTrocas"
      FROM 	clientes where name = '` +
        name +
        `'
  `
    );
    return response.json(someQuery);
  }

  async login(request: Request, response: Response) {
    const { name, senha } = request.body;
    var crypto = require("crypto");

    const clienteRepository = getRepository(Cliente);
    try {
      //const senhaHash = crypto.createHash("sha256").update(senha).digest("hex");
      const cliente = await clienteRepository.find({ email: name });
      const isRight = cliente[0].senha == senha ? true : false;
      return response.json({ logou: isRight, cliente });
    } catch (err) {
      console.log("erro login back-end: " + err);

      return response.json({ logou: false });
    }
  }

  async find(request: Request, response: Response) {
    const { name } = request.body;

    const clienteRepository = getRepository(Cliente);
    const cliente = await clienteRepository.find({ name: name });
    return response.json(cliente[0]);
  }

  async findById(request: Request, response: Response) {
    try {
      const clienteRepository = getRepository(Cliente);
      const cliente = await clienteRepository.find({ id: request.params.id });
      return response.json(cliente);
    } catch {
      return response.json({ error: "Não existe" })
    }
  }

  async UpdateAvatar(request: Request, response: Response) {
    const{
      avatar
    } = request.body
      const clienteRepository = getRepository(Cliente);
      const cliente = await clienteRepository.createQueryBuilder()
      .update(Cliente).set({avatar : avatar})
      .where("id = :id", { id: request.params.id })
      .execute();
      
      return response.send({ resultado: cliente });
  }

  async UpdateCapa(request: Request, response: Response) {
    const{
      capa
    } = request.body
      const clienteRepository = getRepository(Cliente);
      const cliente = await clienteRepository.createQueryBuilder()
      .update(Cliente).set({capa : capa})
      .where("id = :id", { id: request.params.id })
      .execute();
      
      return response.send({ resultado: cliente });
  }


}

export default ClienteController;
