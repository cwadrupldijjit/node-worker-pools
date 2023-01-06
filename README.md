A simple proof-of-concept/example of how node worker threads work with a pool of workers.  It also shows how you can use them with TypeScript.

In order to run the project, you can either compile the TypeScript and run it that way or run it without compiling by running the following command:

```
node --loader ts-node/esm -r ts-node/register ./index.ts
```

When the app is up and running, it will seem to sit and wait after the warning about the loader shows.  Type anything into the terminal and then press enter.  It will show which worker had it and then a response it got from that worker.  You can continue to do that and it will perform a round-robin on the available workers.  If you type "exit", the program will exit.
