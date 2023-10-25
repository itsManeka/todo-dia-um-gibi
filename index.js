require("dotenv").config();

const lePagina = require('./src/scrapper/scrapper.js');
const postaTuite = require('./src/twitter/post.js');

const {CronJob, ToadScheduler, SimpleIntervalJob, Task} = require('toad-scheduler');

const criaJobCron = function(nome, callback, configuracao) {
    const task = new Task(nome, callback);
    const job = new CronJob(configuracao, task, {preventOverrun: true});
    return job;
}

const criaJob = function() {
    const scheduler = new ToadScheduler()

    scheduler.addCronJob(criaJobCron('gibidodia', init, {cronExpression: '0 10 12 * * *'}));
}

const init = async function() {
    var retorno = await lePagina('http://www.guiadosquadrinhos.com/edicao-aleatoria');
    if (retorno) {
        retorno = await postaTuite(retorno);
    }

    return retorno;
}

criaJob();