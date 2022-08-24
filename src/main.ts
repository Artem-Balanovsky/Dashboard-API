import { Container, ContainerModule, interfaces } from 'inversify';
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

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IExemptionFilter>(TYPES.ExemptionFilter).to(ExemptionFilter);
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<App>(TYPES.Application).to(App);
})

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { appContainer, app }
}

export const { app, appContainer } = bootstrap();



// }

// bootstrap();
