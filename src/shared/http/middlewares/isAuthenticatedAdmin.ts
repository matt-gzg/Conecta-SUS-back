import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AdminsRepository } from "@modules/admins/typeorm/repositories/AdminsRepository";

interface ITokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default async function isAuthenticatedAdmin(request: Request, response: Response, next: NextFunction) : Promise<void>{
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new AppError('JWT token is missing', 401);
    }
    const [type, token] = authHeader.split(' ');
    try{
        const decodedToken = verify(token, auth.jwt.secret) as ITokenPayload & { role?: string };
        const { sub, role } = decodedToken;

        request.user = { id: sub } as any;

        if (role) {
            request.user.role = role;
        }

        if (request.user.role !== 'admin') {
            throw new AppError('Insufficient permissions', 403);
        }

        return next();
    }
    catch(err){
        if(err instanceof AppError){
            if(err.statusCode == 403){
                throw err;
            }
        }
        else {
            throw new AppError('Invalid JWT token', 401);
        }
    }
}