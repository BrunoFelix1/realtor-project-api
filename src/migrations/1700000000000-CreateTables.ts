import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1700000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "role" character varying(50) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "clients" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "phone" character varying(20) NOT NULL,
                "type" character varying CHECK ("type" IN ('locador', 'locatario')) NOT NULL,
                "document" character varying(20) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_clients_email" UNIQUE ("email"),
                CONSTRAINT "UQ_clients_document" UNIQUE ("document"),
                CONSTRAINT "PK_clients" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "properties" (
                "id" SERIAL NOT NULL,
                "title" character varying(255) NOT NULL,
                "description" text NOT NULL,
                "address" character varying(500) NOT NULL,
                "price" numeric(10,2) NOT NULL,
                "available" boolean NOT NULL DEFAULT true,
                "photoBase64" text,
                "photoMimeType" character varying(100),
                "photoFileName" character varying(255),
                "landlord_id" integer NOT NULL,
                "created_by_user_id" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_properties" PRIMARY KEY ("id"),
                CONSTRAINT "FK_properties_landlord" FOREIGN KEY ("landlord_id") REFERENCES "clients"("id"),
                CONSTRAINT "FK_properties_created_by_user" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "visits" (
                "id" SERIAL NOT NULL,
                "property_id" integer NOT NULL,
                "client_id" integer NOT NULL,
                "scheduledAt" TIMESTAMP NOT NULL,
                "status" character varying CHECK ("status" IN ('agendada', 'realizada', 'cancelada')) NOT NULL DEFAULT 'agendada',
                "notes" text,
                "created_by_user_id" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_visits" PRIMARY KEY ("id"),
                CONSTRAINT "FK_visits_property" FOREIGN KEY ("property_id") REFERENCES "properties"("id"),
                CONSTRAINT "FK_visits_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id"),
                CONSTRAINT "FK_visits_created_by_user" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "rentals" (
                "id" SERIAL NOT NULL,
                "property_id" integer NOT NULL,
                "tenant_id" integer NOT NULL,
                "startDate" date NOT NULL,
                "endDate" date NOT NULL,
                "monthlyValue" numeric(10,2) NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "created_by_user_id" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_rentals" PRIMARY KEY ("id"),
                CONSTRAINT "FK_rentals_property" FOREIGN KEY ("property_id") REFERENCES "properties"("id"),
                CONSTRAINT "FK_rentals_tenant" FOREIGN KEY ("tenant_id") REFERENCES "clients"("id"),
                CONSTRAINT "FK_rentals_created_by_user" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "rent_invoices" (
                "id" SERIAL NOT NULL,
                "rental_id" integer NOT NULL,
                "dueDate" date NOT NULL,
                "amount" numeric(10,2) NOT NULL,
                "status" character varying CHECK ("status" IN ('pendente', 'pago', 'atrasado')) NOT NULL DEFAULT 'pendente',
                "paidAt" TIMESTAMP,
                "generated_by_user_id" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_rent_invoices" PRIMARY KEY ("id"),
                CONSTRAINT "FK_rent_invoices_rental" FOREIGN KEY ("rental_id") REFERENCES "rentals"("id"),
                CONSTRAINT "FK_rent_invoices_generated_by_user" FOREIGN KEY ("generated_by_user_id") REFERENCES "users"("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "receipts" (
                "id" SERIAL NOT NULL,
                "rent_invoice_id" integer NOT NULL,
                "issuedAt" TIMESTAMP NOT NULL,
                "commissionValue" numeric(10,2) NOT NULL,
                "taxValue" numeric(10,2) NOT NULL,
                "totalValue" numeric(10,2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_receipts" PRIMARY KEY ("id"),
                CONSTRAINT "FK_receipts_rent_invoice" FOREIGN KEY ("rent_invoice_id") REFERENCES "rent_invoices"("id")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "client_history" (
                "id" SERIAL NOT NULL,
                "client_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                "action" character varying(500) NOT NULL,
                "reference_id" integer,
                "timestamp" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_client_history" PRIMARY KEY ("id"),
                CONSTRAINT "FK_client_history_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id"),
                CONSTRAINT "FK_client_history_user" FOREIGN KEY ("user_id") REFERENCES "users"("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "client_history"`);
        await queryRunner.query(`DROP TABLE "receipts"`);
        await queryRunner.query(`DROP TABLE "rent_invoices"`);
        await queryRunner.query(`DROP TABLE "rentals"`);
        await queryRunner.query(`DROP TABLE "visits"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
