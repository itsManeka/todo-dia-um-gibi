require("dotenv").config();

const twitter = require('./client.js');
const axios = require('axios');
const fs = require('fs');

const imagem = 'imagem.png';

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const getDescricao = function (elemento, texto) {
    var descricao = '';
    if (elemento) {
        descricao = `${texto} ${elemento.substring(0, 100)}\n`;    
    }
    return descricao;
}

const montaDescricao = function (json) {
    var descricao = '';
    
    descricao += getDescricao(json.titulo, '💬') + '\n';
    descricao += getDescricao(json.publicacao, 'Publicação:');
    descricao += getDescricao(json.editora, 'Editora:');
    descricao += getDescricao(json.licenciador, 'Licenciador:');
    descricao += getDescricao(json.paginas, 'Páginas:');
    descricao += getDescricao(json.preco, 'Preço:');

    return descricao;
}

const baixaImagem = async function(url, nome) {
    var response = undefined;

    try {
        response = await axios.get(url, { responseType: 'arraybuffer' });

        fs.writeFile(nome, response.data, (err) => {
            if (err) throw err;
        });
    } catch (err) {
        console.log(`erro ao baixar imagem.\nurl:${url}\nerro:${err.message}`);
        //-- Continua tentando
        await delay(5000);
        response = await baixaImagem(url, nome);
    }

    return response;
}

const postaTuite = async function (json) {
    var retorno;

    try {
        const descricao = montaDescricao(json);
        
        const response = await baixaImagem(json.imagem, imagem);
        if (response) {
            console.log("descricao " + descricao);
            console.log("imagem " + imagem);
            const uploadedMedia = await twitter.v1.uploadMedia(imagem);

            await twitter.v2.tweet({
                text: descricao,
                media: {
                    media_ids: [uploadedMedia]
                },
            });

            return true;
        }
    } catch (err) {
        console.log(`erro ao postar twite: ${err.message}`);
        //-- Continua tentando
        await delay(5000);
        retorno = await postaTuite(json);
    }

    return retorno;
}

module.exports = postaTuite;