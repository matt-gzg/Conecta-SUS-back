import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticatedSecretary(request: Request, response: Response, next: NextFunction) : void{
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

        if (request.user.role !== 'secretary' && request.user.role !== 'admin') {
            throw new AppError('Insufficient permissions', 403);
        }

        return next();
    }
    catch{
        throw new AppError('Invalid JWT token', 401);
    }
}