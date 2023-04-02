import { PrismaClient } from "@prisma/client";

export class DatabaseClient {
  public prisma: PrismaClient;
  private static _instance: DatabaseClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance = () => {
    if (!DatabaseClient._instance) {
      DatabaseClient._instance = new DatabaseClient();
    }
    return DatabaseClient._instance;
  };
}
