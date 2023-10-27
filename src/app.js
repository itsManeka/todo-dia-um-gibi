require("dotenv").config();

const lePagina = require('./scrapper/scrapper.js');
const postaTuite = require('./twitter/post.js');

const executa = async function() {
    var retorno = await lePagina('http://www.guiadosquadrinhos.com/edicao-aleatoria');
    if (retorno) {
        retorno = await postaTuite(retorno);
    }

    return retorno;
}

module.exports = executa;