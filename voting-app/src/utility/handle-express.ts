import { Response } from 'express';
import { HttpError } from './my-error';

export const handleExpress = <T>(res: Response, cb: () => T) => {
    try {
        const data = cb();
        res.status(200).send(data);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).send(error.message);
            return;
        }

        res.status(500).send();
    }
};
