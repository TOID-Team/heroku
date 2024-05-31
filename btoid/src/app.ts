import express from 'express';
import session from 'express-session';

import authRouter from './routers/auth.router';
import chatRoomParticipantsRouter from './routers/chatroom-participants.router';
import chatRoomsRouter from './routers/chatrooms.router';
import jobPostApplicationWorksRouter from './routers/job-post-application-works.router';
import jobPostApplicationsRouter from './routers/job-post-applications.router';
import jobPostKeywordsRouter from './routers/job-post-keywords.router';
import jobPostsRouter from './routers/job-posts.router';
import messageRouter from './routers/messages.router';
import postCommentsRouter from './routers/post-comments.router';
import postImagesRouter from './routers/post-images.router';
import postLikesRouter from './routers/post-likes.router';
import postsRouter from './routers/posts.router';
import userGuestbooksRouter from './routers/user-guestbooks.router';
import userKeywordsRouter from './routers/user-keywords.router';
import userLikesRouter from './routers/user-likes.router';
import userRepresentativeKeywordsRouter from './routers/user-representative-keywords.router';
import userSnsRouter from './routers/user-sns.router';
import userVisitorLogRouter from './routers/user-visitor-log.router';
import usersRouter from './routers/users.router';
import workImagesRouter from './routers/work-images.router';

import worksRouter from './routers/works.router';
import userSchedule from './routers/user-schedule.router';
import imagesRouter from './routers/images.router';

import notificationsRouter from './routers/notifications.router';

import { dataSource } from './configs/typeorm';
import { redisClient } from './configs/redis';
const router = express.Router();
import path from 'path';

const app = express();
const port = 3000;

dataSource.initialize();
redisClient.on('connect', () => console.log('redis connected'));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(express.raw({ type: 'image/jpeg', limit: '100mb' }));
app.use(express.raw({ type: 'image/png', limit: '100mb' }));
console.log(__dirname)
app.use((err, req, res, next) => {

  console.error(err.stack);
  res.status(500).send('500');
});

app.use(express.static(path.join(__dirname, '../toid/build')));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/chatroom-participants', chatRoomParticipantsRouter);
app.use('/api/chatrooms', chatRoomsRouter);
app.use('/api/job-post-application-works', jobPostApplicationWorksRouter);
app.use('/api/job-post-applications', jobPostApplicationsRouter);
app.use('/api/job-post-keywords', jobPostKeywordsRouter);
app.use('/api/job-posts', jobPostsRouter);
app.use('/api/messages', messageRouter);
app.use('/api/post-comments', postCommentsRouter);
app.use('/api/post-images', postImagesRouter);
app.use('/api/post-likes', postLikesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/user-guestbooks', userGuestbooksRouter);
app.use('/api/user-keywords', userKeywordsRouter);
app.use('/api/user-likes', userLikesRouter);
app.use('/api/user-representative-keywords', userRepresentativeKeywordsRouter);
app.use('/api/user-sns', userSnsRouter);
app.use('/api/user-schedule', userSchedule);
app.use('/api/user-visitor-log', userVisitorLogRouter);
app.use('/api/users', usersRouter);
app.use('/api/work-images', workImagesRouter);
app.use('/api/works', worksRouter);
app.use('/api/images', imagesRouter);
app.use('/api/notifications', notificationsRouter);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../toid/build/index.html'));
});

app.use('/', router);

console.log('app is running on port'+port);
app.listen(port);
