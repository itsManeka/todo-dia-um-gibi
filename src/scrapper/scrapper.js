const axios = require('axios');
const cheerio = require('cheerio');


const navegar = async function (url) {
    const retorno = await axios.get('http://www.guiadosquadrinhos.com/edicao-aleatoria');
    const pagina = cheerio.load(retorno.data);
    return pagina;
}

const selectElement = function (pagina, selector) {
    var element = undefined;

    if (pagina) {
        element = pagina(selector); 
    }

    return element;
}

const getElementById = function (pagina, json, campo, id) {
    const selector = `#${id}`;
    const element = selectElement(pagina, selector);
    if (element) {
        json[campo] = element.text().trim();
    }
}

const getAttributeById = function (pagina, json, campo, id, attr) {
    const selector = `#${id}`;
    const element = selectElement(pagina, selector);
    if (element) {
        json[campo] = element.attr(attr).trim();
    }
}

const lePagina = async function (url) {
    const pagina = await navegar(url);
    const json = {};
    if (pagina) {
        getElementById(pagina, json, 'titulo', 'nome_titulo_lb');
        getAttributeById(pagina, json, 'imagem', 'ampliar_capa', 'href');
        getElementById(pagina, json, 'publicacao', 'data_publi');
        getElementById(pagina, json, 'editora', 'editora_link');
        getElementById(pagina, json, 'licenciador', 'licenciador');
        getElementById(pagina, json, 'paginas', 'paginas');
        getElementById(pagina, json, 'preco', 'preco');
        return json;
    }

    return undefined;
}

module.exports = lePagina;