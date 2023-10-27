require("dotenv").config();

const executa = require('./app');

const {CronJob, ToadScheduler, SimpleIntervalJob, Task} = require('toad-scheduler');

const criaJobCron = function(nome, callback, configuracao) {
    const task = new Task(nome, callback);
    const job = new CronJob(configuracao, task,);
    return job;
}

const criaJob = function() {
    const scheduler = new ToadScheduler()

    scheduler.addCronJob(criaJobCron('gibidodia', () => {executa()}, {cronExpression: '0 10 12 * * *'}));
}

module.exports = criaJob;