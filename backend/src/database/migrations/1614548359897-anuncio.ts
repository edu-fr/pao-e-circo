import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class anuncio1614548359897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
              new Table({
                name: "anuncios",
                columns: [
                  {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                  },
                  {
                    name: "name",
                    type: "varchar",
                  },
                  {
                    name: "cpf",
                    type: "varchar",
                  },
                  {
                    name: "endereco",
                    type: "varchar",
                  },
                  {
                    name: "dataNasc",
                    type: "varchar",
                  },
                  {
                    name: "cidade",
                    type: "varchar",
                  },
                  {
                    name: "estado",
                    type: "varchar",
                  },
                  {
                    name: "email",
                    type: "varchar",
                  },
                  {
                    name: "senha",
                    type: "varchar",
                  },
                  {
                    name: "nota",
                    isNullable: true,
                    type: "float",
                  },
                ],
              })
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clientes");
    }

}
