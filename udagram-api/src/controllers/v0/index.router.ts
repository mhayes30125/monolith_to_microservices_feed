import {Router, Request, Response} from 'express';
import {FeedRouter} from './feed/routes/feed.router';
import {HealthcheckRouter} from './health/routes/healthcheck.router';

const router: Router = Router();

router.use('/feed', FeedRouter);
router.use('/healthcheck', HealthcheckRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
