import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { appendFile } from "fs/promises";
import path from "path";
import { EOL } from "os";

const errorMiddleware = async (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "An error has occured";
  console.log(status, message);
  await appendFile(
    path.join(process.cwd(), "error.log"),
    `${new Date().toLocaleString()} - ${status} - ${message}${EOL + EOL}`
  );
};

export default errorMiddleware;
