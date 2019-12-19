import "reflect-metadata";
import express from "express";
import { Container } from "typedi";
import * as cron from "../lib/index";

cron.useContainer(Container);
cron.registerJobs([__dirname + "/jobs/**/*.js"]);

const app = express();

app.get("/start-job/:name", (req, res) => {
    cron.startCron(req.params.name);
    res.send("");
});

app.get("/stop-job/:name", (req, res) => {
    cron.stopCron(req.params.name);
    res.send("");
});

app.get("/exec-job/:name", (req, res) => {
    cron.execCron(req.params.name);
    res.send("");
});

app.listen(8080);
