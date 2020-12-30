import {Router, Request, Response} from 'express';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.sendStatus(200);
  });

export const HealthcheckRouter: Router = router;