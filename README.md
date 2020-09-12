# Cron Decorators

[![npm version](https://badge.fury.io/js/cron-decorators.svg)](https://badge.fury.io/js/cron-decorators)
[![Action status](https://github.com/mrbandler/cron-decorators/workflows/build/badge.svg)](https://github.com/mrbandler/cron-decorators/actions)
[![GitHub License](https://img.shields.io/github/license/mrbandler/cron-decorators)](https://github.com/mrbandler/cron-decorators/blob/master/LICENSE)

[![Donate with Bitcoin](https://en.cryptobadges.io/badge/micro/3LTBGYAHQCDE4ZbEiTreJjzgnsDhY6X2D2)](https://en.cryptobadges.io/donate/3LTBGYAHQCDE4ZbEiTreJjzgnsDhY6X2D2)
[![Donate with Litecoin](https://en.cryptobadges.io/badge/micro/LcHsJH13A8PmHJQwpbWevGUebZwhWNMXgS)](https://en.cryptobadges.io/donate/LcHsJH13A8PmHJQwpbWevGUebZwhWNMXgS)
[![Donate with Ethereum](https://en.cryptobadges.io/badge/micro/0x54499ee409687E9C43589693093D004a0cbfEE72)](https://en.cryptobadges.io/donate/0x54499ee409687E9C43589693093D004a0cbfEE72)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/mrbandler/)

**Package to implement cron jobs via a class based system in Typescript.**

## Table of Content

1. [Installation](#1-installation) 💻
2. [Usage](#2-usage) ⌨️
3. [Bugs and Features](#3-bugs-and-features) 🐞💡
4. [Buy me a coffee](#4-buy-me-a-coffee) ☕
5. [License](#5-license) 📃

## 1. Installation

```bash
$ npm install cron-**decoratorsb**
```

OR

```bash
$ yarn add cron-decorators
```

## 2. Usage

**Before:**

```typescript
import express from "express";
import { CronJob } from "cron";

// Setup crons.

let cronJobs: Map<string, CronJob> = new Map<string, CronJob>();

let secCronJob = new CronJob("* * * * * *", () => {
    console.log("I am cron Job 'sec' and I just ran!");
});

cronJobs.set("sec", secCronJob);

let tenSecCronJob = new CronJob("*/10 * * * * *", () => {
    console.log("I am cron Job 'sec' and I just ran!");
});

cronJobs.set("10sec", tenSecCronJob);
cronJobs.forEach((v, k) => v.start());

// Add RESTful interface.

const app = express();

app.get("/stop-job/:name", (req, res) => {
    const cron = cronJobs.get(req.params.name);

    if (cron) {
        cron.stop();
        res.send(`Cron job ${req.params.name} stopped`);
    } else {
        res.send(`Cron job ${req.params.name} could not be found`);
    }
});

app.get("/start-job/:name", (req, res) => {
    const cron = cronJobs.get(req.params.name);

    if (cron) {
        cron.start();
        res.send(`Cron job ${req.params.name} started`);
    } else {
        res.send(`Cron job ${req.params.name} could not be found`);
    }
});

app.get("/exec-job/:name", (req, res) => {
    const cron = cronJobs.get(req.params.name);

    if (cron) {
        cron.fireOnTick();
        res.send(`Cron job ${req.params.name} executed`);
    } else {
        res.send(`Cron job ${req.params.name} could not be found`);
    }
});

app.get("/job/:name", (req, res) => {
    const cron = cronJobs.get(req.params.name);
    if (cron) {
        res.send(`Cron job '${req.params.name}' will run next on ${cron.nextDate()}`);
    } else {
        res.send(`Cron job '${req.params.name}' could not be found`);
    }
});

app.listen(8080);
```

**With Cron Decorators:**

```typescript
// job.controller.ts

import { CronController, Cron } from "cron-decorators";
import moment from "moment";

// Cron jobs will be mounted under the namespace "jobs".
@CronController("jobs")
export class JobController {
    // Async cron job that runs every second.
    @Cron("sec", "* * * * * *")
    public async secCronJob(): Promise<void> {
        console.log("I am cron Job 'sec' and I just ran!");
    }

    // Cron job that runs every 10 seconds.
    @Cron("10sec", "*/10 * * * * *")
    public tenSecCronJob(): void {
        console.log("I am cron Job '10sec' and I just ran!");
    }

    // Cron job that runs at the 22nd December 2019 at 15:42:00.
    @Cron("date", new Date("December 22, 2019 15:42:00"))
    public dateCronJob(): void {
        console.log("I am cron Job 'date' and I just ran!");
    }

    // Cron job that runs at the 22nd December 2019 at 15:42:00.
    @Cron("moment", moment("2019-12-22 15:42:00"), {
        runOnInit: false,
        timeZone: "Europe/Berlin",
    })
    public momentCronJob(): void {
        console.log("I am cron Job 'moment' and I just ran!");
    }
}
```

```typescript
// server.ts

import "reflect-metadata";
import express from "express";
import { registerController, stopCron, startCron, execCron, getCron, getCrons } from "cron-decorators";
import { CronJob } from "cron";

registerController([__dirname + "/jobs/**/*.js"]);

const app = express();

// You can stop a cron job with its given name.
app.get("/stop-job/:name", (req, res) => {
    stopCron(req.params.name);
    res.send(`Cron job ${req.params.name} stopped`);
});

// You can re-start a stopped cron job with its given name.
app.get("/start-job/:name", (req, res) => {
    startCron(req.params.name);
    res.send(`Cron job ${req.params.name} stared`);
});

// You can start a cron job manually.
app.get("/exec-job/:name", (req, res) => {
    execCron(req.params.name);
    res.send(`Cron job ${req.params.name} executed`);
});

// You can retrieve the underlaying cron job.
app.get("/job/:name", (req, res) => {
    const namedCron = getCron(req.params.name);
    if (namedCron) {
        res.send(`Cron job '${req.params.name}' will run next on ${namedCron.nextDate()}`);
    } else {
        res.send(`Cron job '${req.params.name}' could not be found`);
    }
});

// You can retrieve all decorated cron jobs.
app.get("/jobs/:namespace?", (req, res) => {
    const crons: Map<string, CronJob> = getCrons(req.params.namespace);

    const response: string[] = [];
    crons.forEach((v, k) => {
        try {
            response.push(`Cron job '${k}' will run next on ${v.nextDate()}`);
        } catch {}
    });

    res.send(response);
});

app.listen(8080);
```

### Depencency Injection Support

cron-decorators can be used in conjunction with [typedi](https://github.com/typestack/typedi).

```typescript
import { useContainer } from "cron-decorators";
import { Container } from "typedi";

useContainer(Container);
```

That's it now you can inject services into your decorated `CronController` classes.

```typescript
import { CronController, Cron } from "cron-decorators";
import { Service, Inject } from "typedi";

@Service()
export class GreeterService {
    public greet(name: string): string {
        return "Hello, " + name;
    }
}

@CronController("jobs")
export class JobController {

    @Inject()
    private greeterService: GreeterService;

    @Cron("sec", "* * * * * *")
    public async secCronJob(): Promise<void> {
        const message = this.greeterService.greet("mrbandler");
        console.log(message);
    }
```

## 3. Bugs and Features

Please open a issue when you encounter any bugs 🐞 or if you have an idea for a additional feature 💡.

## 4. Buy me a coffee

[![Support via PayPal](https://cdn.rawgit.com/twolfson/paypal-github-button/1.0.0/dist/button.svg)](https://www.paypal.me/mrbandler/)

[![Donate with Bitcoin](https://en.cryptobadges.io/badge/big/3LTBGYAHQCDE4ZbEiTreJjzgnsDhY6X2D2)](https://en.cryptobadges.io/donate/3LTBGYAHQCDE4ZbEiTreJjzgnsDhY6X2D2)

[![Donate with Litecoin](https://en.cryptobadges.io/badge/big/LcHsJH13A8PmHJQwpbWevGUebZwhWNMXgS)](https://en.cryptobadges.io/donate/LcHsJH13A8PmHJQwpbWevGUebZwhWNMXgS)

[![Donate with Ethereum](https://en.cryptobadges.io/badge/big/0x54499ee409687E9C43589693093D004a0cbfEE72)](https://en.cryptobadges.io/donate/0x54499ee409687E9C43589693093D004a0cbfEE72)

---

## 5. License

MIT License

Copyright (c) 2019 mrbandler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
