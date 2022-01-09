import cors from 'cors';
import express from 'express';
import handleError from './middleware/handleError';
import rootRouter from './routes/root';
import userCheckTokenRouter from './routes/user/check-token';
import userCreateRouter from './routes/user/create';
import userDeleteRouter from './routes/user/delete';
import userPracticeSettingsRouter from './routes/user/practice-settings';
import userPracticeStatsRootRouter from './routes/user/practice_stats/root';
import userPracticeStatsRoundAbortionRouter from './routes/user/practice_stats/round-abortion';
import userPracticeStatsRoundCompletionRouter from './routes/user/practice_stats/round-completion';
import userSignInRouter from './routes/user/sign-in';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', rootRouter);
app.use('/user/create', userCreateRouter);
app.use('/user/sign-in', userSignInRouter);
app.use('/user/check-token', userCheckTokenRouter);
app.use('/user/delete', userDeleteRouter);
app.use('/user/practice-settings', userPracticeSettingsRouter);
app.use('/user/practice-stats', userPracticeStatsRootRouter);
app.use(
  '/user/practice-stats/round-completion',
  userPracticeStatsRoundCompletionRouter,
);
app.use(
  '/user/practice-stats/round-abortion',
  userPracticeStatsRoundAbortionRouter,
);

app.use(handleError);

export default app;
