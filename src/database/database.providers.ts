import { createConnection } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async () =>
      await createConnection({
        type: "postgres",
        host: "aws-0-ap-southeast-1.pooler.supabase.com",
        port: 5432,
        username: "postgres.tiiaaoanvrriooisikqb",
        password: "IjzegwNm8HL1OI6r",
        database: "postgres",
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
  },
];
