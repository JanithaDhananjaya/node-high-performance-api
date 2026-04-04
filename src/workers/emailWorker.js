import {Worker} from 'bullmq';

const connection = {
    host: process.env.REDIS_HOST || 'localhost', port: process.env.REDIS_PORT || 6379,
};

const emailWorker = new Worker('email-queue', async (job) => {
    console.log(`Processing Job ID: ${job.id} for ${job.data.email}`);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Email sent successfully to ${job.data.email}`);
}, {connection});

emailWorker.on('completed', (job) => {
    console.log(`Job ID ${job.id} has completed`);
});

emailWorker.on('failed', (job, err) => {
    console.error(`Job ID ${job.id} failed with error: ${err.message}`);
});

export default emailWorker;