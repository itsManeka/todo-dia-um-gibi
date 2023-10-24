const twitter = require('./client.js');
const axios = require('axios');
const fs = require('fs');

const imagem = 'imagem.png';

const getDescricao = function (elemento, texto) {
    var descricao = '';
    if (elemento) {
        descricao = `${texto}: ${elemento.substring(0, 100)}\n`;    
    }
    return descricao;
}

const montaDescricao = function (json) {
    var descricao = '';
    
    descricao += getDescricao(json.titulo, '💬 Título') + '\n';
    descricao += getDescricao(json.publicacao, 'Publicação');
    descricao += getDescricao(json.editora, 'Editora');
    descricao += getDescricao(json.licenciador, 'Licenciador');
    descricao += getDescricao(json.paginas, 'Páginas');
    descricao += getDescricao(json.preco, 'Preço');

    return descricao;
}

const baixaImagem = async function(url, nome) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    fs.writeFile(nome, response.data, (err) => {
      if (err) throw err;
    });
}

const postaTuite = async function (json) {
    try {
        const descricao = montaDescricao(json);
        console.log(json.imagem)
        await baixaImagem(json.imagem, imagem);
        const uploadedMedia = await twitter.v1.uploadMedia(imagem);

        await twitter.v2.tweet({
            text: descricao,
            media: {
                media_ids: [uploadedMedia]
            },
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = postaTuite;