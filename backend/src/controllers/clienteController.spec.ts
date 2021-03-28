import ClienteRepository from "../repositórios/ClienteRepository";

describe("Cliente controller", () => {
  it("Deve ser capaz de criar um usuário", async () => {
    const clienteRepository = new ClienteRepository();

    const User = await clienteRepository.create({
      name: "flavin do pneu",
      cpf: "12345678910",
      cidade: "maringay",
      dataNasc: "12/12/2012",
      email: "flavindopneu@gmail.com",
      endereco: "rua do shaolin matador de porco",
      estado: "liquido",
      senha: "jorgejuca.123",
    });
    expect(User).toHaveProperty("id");
  });

  it("Não deve ser capaz de criar dois usuários com o mesmo email", async () => {
    const clienteRepository = new ClienteRepository();

    await clienteRepository.create({
      name: "flavin do pneu",
      cpf: "12345678910",
      cidade: "maringay",
      dataNasc: "12/12/2012",
      email: "flavindopneu@gmail.com",
      endereco: "rua do shaolin matador de porco",
      estado: "liquido",
      senha: "jorgejuca.123",
    });

    expect(
      clienteRepository.create({
        name: "flavin do pneu",
        cpf: "12345678910",
        cidade: "maringay",
        dataNasc: "12/12/2012",
        email: "flavindopneu@gmail.com",
        endereco: "rua do shaolin matador de porco",
        estado: "liquido",
        senha: "jorgejuca.123",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Deve ser capaz de encontrar um usuário a partir do seu nome", async () => {
    const clienteRepository = new ClienteRepository();

    const cliente = await clienteRepository.create({
      name: "flavin do pneu",
      cpf: "12345678910",
      cidade: "maringay",
      dataNasc: "12/12/2012",
      email: "flavindopneu@gmail.com",
      endereco: "rua do shaolin matador de porco",
      estado: "liquido",
      senha: "jorgejuca.123",
    });

    expect(clienteRepository.findByName(cliente.name)).toBe("flavin do pneu");
  });
});
