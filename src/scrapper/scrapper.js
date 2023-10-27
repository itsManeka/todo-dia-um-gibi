require("dotenv").config();

const axios = require('axios');
const cheerio = require('cheerio');

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const navegar = async function (url) {
    try {
        const retorno = await axios.get(url);
        const pagina = cheerio.load(retorno.data);
        return pagina;
    } catch (err) {
        console.log(`erro ao navegar: ${err.message}`);
    }

    return undefined;
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
        var text = element.text();
        if (text !== null && text !== undefined) {
            json[campo] = text.trim();
        }
    }
}

const getAttributeById = function (pagina, json, campo, id, attr) {
    const selector = `#${id}`;
    const element = selectElement(pagina, selector);
    if (element) {
        var text = element.attr(attr);
        if (text !== null && text !== undefined) {
            json[campo] = text.trim();
        }
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
    } else {
        //-- Continua tentando
        await delay(5000);
        return await lePagina(url);
    }
}

module.exports = lePagina;