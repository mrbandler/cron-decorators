import "reflect-metadata";
import express from "express";
import { useContainer, registerController, stopCron, startCron, execCron, getCron, getCrons } from "../lib/index";
import { Container } from "typedi";
import { CronJob } from "cron";

useContainer(Container);
registerController([__dirname + "/jobs/**/*.js"]);

const app = express();

/**
 * You can stop a cron job with its given name.
 *
 */
app.get("/stop-job/:name", (req, res) => {
    stopCron(req.params.name);
    res.send(`Cron job ${req.params.name} stopped`);
});

/**
 * You can re-start a stopped cron job with its given name.
 *
 */
app.get("/start-job/:name", (req, res) => {
    startCron(req.params.name);
    res.send(`Cron job ${req.params.name} stared`);
});

/**
 * You can start a cron job manually.
 *
 */
app.get("/exec-job/:name", (req, res) => {
    execCron(req.params.name);
    res.send(`Cron job ${req.params.name} executed`);
});

/**
 * You can retrieve the underlaying cron job.
 *
 */
app.get("/job/:name", (req, res) => {
    const namedCron = getCron(req.params.name);
    if (namedCron) {
        res.send(`Cron job '${req.params.name}' will run next on ${namedCron.nextDate()}`);
    } else {
        res.send(`Cron job '${req.params.name}' could not be found`);
    }
});

/**
 * You can retrieve all decorated cron jobs.
 *
 */
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
