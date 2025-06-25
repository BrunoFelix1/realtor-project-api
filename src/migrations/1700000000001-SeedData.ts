import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedData1700000000001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "users" ("name", "email", "password", "role") VALUES
            ('Admin Sistema', 'admin@teste.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
            ('Corretor João', 'joao@teste.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'corretor'),
            ('Corretor Maria', 'maria@teste.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'corretor')
        `);

        await queryRunner.query(`
            INSERT INTO "clients" ("name", "email", "phone", "type", "document") VALUES
            ('Carlos Silva', 'carlos@teste.com', '11999999999', 'locador', '12345678901'),
            ('Ana Santos', 'ana@teste.com', '11888888888', 'locatario', '98765432109'),
            ('Pedro Oliveira', 'pedro@teste.com', '11777777777', 'locador', '11122233344'),
            ('Julia Costa', 'julia@teste.com', '11666666666', 'locatario', '55566677788')
        `);

        await queryRunner.query(`
            INSERT INTO "properties" ("title", "description", "address", "price", "available", "landlord_id", "created_by_user_id") VALUES
            ('Apartamento 2 quartos Centro', 'Apartamento bem localizado no centro da cidade', 'Rua das Flores, 123 - Centro', 1500.00, false, 1, 2),
            ('Casa 3 quartos Jardim', 'Casa ampla com quintal em bairro residencial', 'Av. dos Jardins, 456 - Jardim América', 2200.00, true, 3, 2),
            ('Studio Zona Sul', 'Studio moderno e funcional', 'Rua da Praia, 789 - Zona Sul', 1200.00, false, 1, 3)
        `);

        await queryRunner.query(`
            INSERT INTO "visits" ("property_id", "client_id", "scheduledAt", "status", "notes", "created_by_user_id") VALUES
            (1, 2, '2024-01-15 14:00:00', 'realizada', 'Cliente demonstrou interesse', 2),
            (2, 4, '2024-01-20 10:30:00', 'agendada', 'Primeira visita agendada', 2),
            (3, 4, '2024-01-18 16:00:00', 'cancelada', 'Cliente cancelou por motivos pessoais', 3)
        `);

        await queryRunner.query(`
            INSERT INTO "rentals" ("property_id", "tenant_id", "startDate", "endDate", "monthlyValue", "active", "created_by_user_id") VALUES
            (1, 2, '2024-01-01', '2024-12-31', 1500.00, true, 2),
            (3, 4, '2024-02-01', '2025-01-31', 1200.00, true, 3)
        `);

        await queryRunner.query(`
            INSERT INTO "rent_invoices" ("rental_id", "dueDate", "amount", "status", "paidAt", "generated_by_user_id") VALUES
            (1, '2024-01-05', 1500.00, 'pago', '2024-01-03 10:30:00', 2),
            (1, '2024-02-05', 1500.00, 'pago', '2024-02-01 14:15:00', 2),
            (1, '2024-03-05', 1500.00, 'pendente', NULL, 2),
            (1, '2024-04-05', 1500.00, 'atrasado', NULL, 2),
            (2, '2024-02-05', 1200.00, 'pago', '2024-02-03 09:20:00', 3),
            (2, '2024-03-05', 1200.00, 'pendente', NULL, 3)
        `);

        await queryRunner.query(`
            INSERT INTO "receipts" ("rent_invoice_id", "issuedAt", "commissionValue", "taxValue", "totalValue") VALUES
            (1, '2024-01-03 10:30:00', 150.00, 45.00, 1305.00),
            (2, '2024-02-01 14:15:00', 150.00, 45.00, 1305.00),
            (5, '2024-02-03 09:20:00', 120.00, 36.00, 1044.00)
        `);

        await queryRunner.query(`
            INSERT INTO "client_history" ("client_id", "user_id", "action", "reference_id", "timestamp") VALUES
            (2, 2, 'Cliente cadastrado no sistema', NULL, '2024-01-10 09:00:00'),
            (2, 2, 'Visita agendada para imóvel', 1, '2024-01-14 15:30:00'),
            (2, 2, 'Contrato de aluguel criado', 1, '2024-01-15 16:00:00'),
            (2, 2, 'Pagamento de aluguel realizado', 1, '2024-01-03 10:30:00'),
            (4, 2, 'Cliente cadastrado no sistema', NULL, '2024-01-12 11:00:00'),
            (4, 3, 'Contrato de aluguel criado', 2, '2024-02-01 10:00:00'),
            (4, 3, 'Pagamento de aluguel realizado', 5, '2024-02-03 09:20:00')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "client_history"`);
        await queryRunner.query(`DELETE FROM "receipts"`);
        await queryRunner.query(`DELETE FROM "rent_invoices"`);
        await queryRunner.query(`DELETE FROM "rentals"`);
        await queryRunner.query(`DELETE FROM "visits"`);
        await queryRunner.query(`DELETE FROM "properties"`);
        await queryRunner.query(`DELETE FROM "clients"`);
        await queryRunner.query(`DELETE FROM "users"`);
    }
}
