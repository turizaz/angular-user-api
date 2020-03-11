import * as express from "express";
import {Request, Response} from "express";
import {IKnexResponse} from "../database/queries/IKnexResponse";
import {IUserInterface} from "../database/queries/users";
import {errors} from "../helpers/errors";
import * as usersService from "../services/users";

const router = express.Router()

router.get("/page/:id?/:search?", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id || 0;
        const search = req.params.search || null;
        const response: IKnexResponse<IUserInterface> = await usersService.get(id, search)
        return res.send(response.rows.map((it: any) => {
            return {...it};
        }));
    } catch (e) {
        return res.status(500).send(errors["500"]);
    }
})

router.delete(`/:id`, async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(422).send(errors["422"]);
        }
        await usersService.remove(id);
        res.status(200).send();
    } catch (e) {
        return res.status(500).send(errors["500"]);
    }
})

router.post("/", async (req: Request, res: Response): Promise<Response> => {
    let user;
    try {
        user = usersService.validate({...req.body});
    } catch (e) {
        return res.status(422).send(errors["422"]);
    }
    try {
        await usersService.save(user)
        return res.status(201).send();
    } catch (e) {
        return res.status(500).send(errors["500"]);
    }
})

export default router;
