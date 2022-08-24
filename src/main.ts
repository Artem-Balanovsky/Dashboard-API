import { Container } from 'inversify';
import { App } from './app'
import { ExemptionFilter } from './errors/exemption.filter';
import { IExemptionFilter } from './errors/exemption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './users/types';
import { UserController } from './users/users.controller';

// async function bootstrap () {
// const logger = new LoggerService();
// const app = new App(
//     logger,
//     new UserController(logger),
//     new ExemptionFilter(logger)
//     );

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExemptionFilter>(TYPES.ExemptionFilter).to(ExemptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);

app.init();
// }

// bootstrap();

export { app, appContainer };