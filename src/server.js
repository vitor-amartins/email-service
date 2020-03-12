import 'dotenv/config';
import express from 'express';
import MailController from './app/controllers/MailController';
import BullBoard from 'bull-board';
import Queue from './app/lib/Queue';

const app = express();
BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());
// TODO: Authorization using passport
app.post('/email/async', MailController.sendAsync);
app.post('/email/sync', MailController.sendSync);

// TODO: Authorization for DBA
app.use('/admin/queues', BullBoard.UI);

app.listen(3333, () => {
  console.log('Server running on localhost:3333');
});
