const lePagina = require('./src/scrapper/scrapper.js');
const postaTuite = require('./src/twitter/post.js');

const init = async function() {
    const retorno = await lePagina('http://www.guiadosquadrinhos.com/edicao-aleatoria');
    if (retorno) {
        await postaTuite(retorno);
    }

    while (true) {
        /*  vou usar no aws com o pm2 com a intenção de executar
            quando o servidor ligar com a função lambda, o while
            serve por causa do keepalive do pm2
        */
    }
}

init();