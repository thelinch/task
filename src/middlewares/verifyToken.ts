import { Request, Response, NextFunction, Router } from "express";

export class VerifyToken {
    router: Router
    constructor() {
        this.router = Router();
    }
    verify(req: Request, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization']
    }
}
const verifyToken = new VerifyToken();
export default verifyToken;
