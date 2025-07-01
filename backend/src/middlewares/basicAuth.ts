import { Request, Response, NextFunction } from "express";

const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME;
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

export const basicAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic ');
        res.status(401).send('Authentication required');
        return;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (
        username === BASIC_AUTH_USERNAME &&
        password === BASIC_AUTH_PASSWORD
    ) {
        return next();
    }


    res.setHeader('WWW-Authenticate', 'Basic ');
    res.status(401).json({ error: 'Invalid credentials' });
};
