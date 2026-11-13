import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction): void => {
    if (error instanceof AppError) {
        response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
        return;
    }

    console.log(error);

    response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});

const port = 3333;

app.listen(port, () => {
  console.log(`HTTP server started on port ${port}!`);
});

/*

const projectRoot = process.cwd();
const certsDir =
  process.env.CERTS_DIR ??
  path.resolve(projectRoot, 'dist', 'shared', 'certs');

const httpsOptions = {
  key: fs.readFileSync(path.resolve(certsDir, 'key.pem')),
  cert: fs.readFileSync(path.resolve(certsDir, 'cert.pem')),
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`HTTPS server started on port ${port}!`);
});

*/