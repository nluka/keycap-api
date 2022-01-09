import express, { Request, Response } from 'express';

const router = express.Router();

// @ts-ignore
router.get('/', (req: Request, res: Response) => {
  res.redirect('https://github.com/nluka/keycap-api');
});

export default router;
