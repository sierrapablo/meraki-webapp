import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
    ): void => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    
    console.error(`[Error] ${statusCode}, - ${message}`);
    
    res.status(statusCode).json({message});
};
