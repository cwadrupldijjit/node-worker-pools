import { isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
    console.error('This should never be run directly');
    process.exit(1);
}

parentPort.on('message', (message: string) => {
    console.log('Hello from worker %s.  Your input was %s.', process.env.WORKER_ID, message);
    
    parentPort.postMessage(Buffer.from(message).toString('base64'));
});
