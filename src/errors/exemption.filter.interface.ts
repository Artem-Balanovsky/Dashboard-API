import { NextFunction, Request, Response } from "express";

export interface IExemptionFilter {
    catch: (err: Error, req: Request, res: Response, next: NextFunction) => void
}