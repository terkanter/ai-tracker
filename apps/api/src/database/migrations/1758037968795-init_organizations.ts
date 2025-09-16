import { MigrationInterface, QueryRunner } from "typeorm";

export class InitOrganizations1758037968795 implements MigrationInterface {
    name = 'InitOrganizations1758037968795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "username" character varying NOT NULL,
                "displayUsername" character varying,
                "email" character varying NOT NULL,
                "isEmailVerified" boolean NOT NULL DEFAULT false,
                "firstName" character varying,
                "lastName" character varying,
                "image" character varying,
                "bio" character varying,
                "twoFactorEnabled" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_80ca6e6ef65fb9ef34ea8c90f4" ON "user" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_92f09bd6964a57bb87891a2acf" ON "user" ("deletedAt")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_070157ac5f9096d1a00bab15aa" ON "user" ("username")
            WHERE "deletedAt" IS NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_25dca47b418c43ad4bdbe4fbb9" ON "user" ("displayUsername")
            WHERE "deletedAt" IS NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_d0012b9482ca5b4f270e6fdb5e" ON "user" ("email")
            WHERE "deletedAt" IS NULL
        `);
        await queryRunner.query(`
            CREATE TABLE "verification" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "identifier" character varying NOT NULL,
                "value" character varying NOT NULL,
                "expiresAt" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_f7e3a90ca384e71d6e2e93bb340" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6c010e82704478f9ea221c1b35" ON "verification" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a040ab7cc0926f164ae15ad2b6" ON "verification" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0c1abed9dae4dce2b564455c57" ON "verification" ("deletedAt")
        `);
        await queryRunner.query(`
            CREATE TABLE "twoFactor" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "userId" uuid NOT NULL,
                "secret" character varying,
                "backupCodes" character varying,
                CONSTRAINT "PK_6e6e22172b1e7437f77cbfed056" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ec40d3b46467f8a90b1c3edc7f" ON "twoFactor" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_aad57fc3380735d3243a16cab0" ON "twoFactor" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_cbcbd8bee2c069f4c9b4101265" ON "twoFactor" ("deletedAt")
        `);
        await queryRunner.query(`
            CREATE TABLE "passkey" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "name" character varying,
                "userId" uuid NOT NULL,
                "publicKey" character varying NOT NULL,
                "credentialID" character varying NOT NULL,
                "counter" integer NOT NULL,
                "deviceType" character varying NOT NULL,
                "backedUp" boolean NOT NULL,
                "transports" character varying NOT NULL,
                CONSTRAINT "PK_783e2060d8025abd6a6ca45d2c7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5ea8f73c946912e5e778c9efca" ON "passkey" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_539353ff4d6a03d6ce2ea5eaa9" ON "passkey" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_97b0ae5c5b6a0044c72fd9fce3" ON "passkey" ("deletedAt")
        `);
        await queryRunner.query(`
            CREATE TABLE "account" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "userId" uuid NOT NULL,
                "accountId" character varying NOT NULL,
                "providerId" character varying NOT NULL,
                "accessToken" character varying,
                "refreshToken" character varying,
                "accessTokenExpiresAt" TIMESTAMP,
                "refreshTokenExpiresAt" TIMESTAMP,
                "scope" character varying,
                "idToken" character varying,
                "password" character varying,
                CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f50e152d11f027ee500dbad6c9" ON "account" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_13af9de5b924749d47952cd1d5" ON "account" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_2cabb849760babe66490f024e1" ON "account" ("deletedAt")
        `);
        await queryRunner.query(`
            CREATE TABLE "session" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "userId" uuid NOT NULL,
                "token" character varying NOT NULL,
                "expiresAt" TIMESTAMP NOT NULL,
                "ipAddress" character varying,
                "userAgent" character varying,
                CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1063954fd0fa5e655cc482fb5c" ON "session" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4b1511ab37f27d6f11242b81c9" ON "session" ("updatedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f2f66f19375cd1e0b43e190a18" ON "session" ("deletedAt")
        `);
        await queryRunner.query(`
            ALTER TABLE "twoFactor"
            ADD CONSTRAINT "FK_03fe91172968ed69813bc6ff0bd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "passkey"
            ADD CONSTRAINT "FK_c36f303905314ea9ead857b6268" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "account"
            ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "session"
            ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"
        `);
        await queryRunner.query(`
            ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"
        `);
        await queryRunner.query(`
            ALTER TABLE "passkey" DROP CONSTRAINT "FK_c36f303905314ea9ead857b6268"
        `);
        await queryRunner.query(`
            ALTER TABLE "twoFactor" DROP CONSTRAINT "FK_03fe91172968ed69813bc6ff0bd"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f2f66f19375cd1e0b43e190a18"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4b1511ab37f27d6f11242b81c9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1063954fd0fa5e655cc482fb5c"
        `);
        await queryRunner.query(`
            DROP TABLE "session"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_2cabb849760babe66490f024e1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_13af9de5b924749d47952cd1d5"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f50e152d11f027ee500dbad6c9"
        `);
        await queryRunner.query(`
            DROP TABLE "account"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_97b0ae5c5b6a0044c72fd9fce3"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_539353ff4d6a03d6ce2ea5eaa9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_5ea8f73c946912e5e778c9efca"
        `);
        await queryRunner.query(`
            DROP TABLE "passkey"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cbcbd8bee2c069f4c9b4101265"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_aad57fc3380735d3243a16cab0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ec40d3b46467f8a90b1c3edc7f"
        `);
        await queryRunner.query(`
            DROP TABLE "twoFactor"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0c1abed9dae4dce2b564455c57"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a040ab7cc0926f164ae15ad2b6"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6c010e82704478f9ea221c1b35"
        `);
        await queryRunner.query(`
            DROP TABLE "verification"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d0012b9482ca5b4f270e6fdb5e"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_25dca47b418c43ad4bdbe4fbb9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_070157ac5f9096d1a00bab15aa"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_92f09bd6964a57bb87891a2acf"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_80ca6e6ef65fb9ef34ea8c90f4"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e11e649824a45d8ed01d597fd9"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
