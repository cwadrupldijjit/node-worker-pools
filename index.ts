import { isMainThread, Worker } from 'worker_threads';

if (!isMainThread) {
    console.error('This must be executed in the main thread');
    process.exit(1);
}

const poolSize = 3;

const pool = Array(poolSize).fill('')
    .reduce<Record<`worker${number}`, Worker>>((p, _, i) => {
        const worker = new Worker('./worker.ts', {
            env: {
                WORKER_ID: String(i),
                NODE_NO_WARNINGS: '1',
            },
            execArgv: [
                '--loader',
                'ts-node/esm',
                '-r',
                'ts-node/register',
            ],
        });
        worker.addListener('message', (message: string) => {
            console.log('message from worker:', message);
        });
        return {
            ...p,
            ['worker' + i]: worker,
        };
    }, {});

let currentWorker = 0;

process.stdin.on('data', (data) => {
    const input = data.toString('utf-8').trim();
    
    if (input == 'exit') {
        process.exit(0);
    }
    
    const worker: Worker = pool['worker' + currentWorker];
    
    advanceWorker();
    
    worker.postMessage(input);
});

function advanceWorker() {
    currentWorker = (currentWorker + 1) % poolSize;
}
