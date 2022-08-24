import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../users/types";
import { IExemptionFilter } from './exemption.filter.interface'
import { HTTPError } from "./http-error.class";
import 'reflect-metadata';


@injectable()
export class ExemptionFilter implements IExemptionFilter {
       constructor(@inject(TYPES.ILogger) private logger: ILogger) {
        this.logger = logger;
    }
    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
            res.status(err.statusCode).send({err: err.message});
        } else {
            this.logger.error(`${err.message}`);
            res.status(500).send({err: err.message});
        }
    }
}