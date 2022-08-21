import express, { Express } from 'express';
import { Server } from 'http';
import { ExemptionFilter } from './errors/exemption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';


export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: UserController;
    exemptionFilter: ExemptionFilter;

    constructor(
        logger: LoggerService,
        userController: UserController,
        exemptionFilter: ExemptionFilter
 ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exemptionFilter = exemptionFilter;

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