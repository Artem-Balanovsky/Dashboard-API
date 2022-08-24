import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ExemptionFilter } from './errors/exemption.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './users/types';
import { UserController } from './users/users.controller';
import 'reflect-metadata';


@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExemptionFilter) private exemptionFilter: ExemptionFilter
 ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExemptionFilter() {
        this.app.use(this.exemptionFilter.catch.bind(this.exemptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExemptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);

    }
}