const lePagina = require('./src/scrapper/scrapper.js');
const postaTuite = require('./src/twitter/post.js');

const init = async function() {
    const retorno = await lePagina('http://www.guiadosquadrinhos.com/edicao-aleatoria');
    await postaTuite(retorno);
}

init();