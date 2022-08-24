import { NextFunction, Request, Response } from "express";

export interface IUserController {
    login: (req: Request, res: Response, next: NextFunction) => void;
    register: (req: Request, res: Response, next: NextFunction) => void;

}


// @injectable()
// export class UserController extends BaseController {
//     constructor(
//         @inject(TYPES.ILogger) private loggerService: ILogger
//     ) {
//         super(loggerService);
//         this.bindRoutes([
//             { path: '/register', method: 'post', func: this.register },
//             { path: '/login', method: 'post', func: this.login }
//         ])
//     }

//     login(req: Request, res: Response, next: NextFunction) {
//         // this.ok(res, 'login');
//         next(new HTTPError(401, 'ошибка авторизации', 'login'))
//     }

//     register(req: Request, res: Response, next: NextFunction) {
//         this.ok(res, 'register')
//     }
// }