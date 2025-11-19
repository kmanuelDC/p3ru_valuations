import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: "postgres://valuations_user:valuations_pass@localhost:5435/valuations_db?schema=public",
  },
});
