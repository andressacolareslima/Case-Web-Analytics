const fs = require('fs').promises;

async function BrokenBase(caminhoArq1, caminhoArq2) {
  try {
    const [BrokenBase1, BrokenBase2] = await Promise.all([
      fs.readFile(caminhoArq1, 'utf-8'),
      fs.readFile(caminhoArq2, 'utf-8')
    ]);

    const index1 = JSON.parse(corrigindoDados(BrokenBase1));
    const index2 = JSON.parse(corrigindoDados(BrokenBase2));

    if (index1.vendas !== undefined) {
      index1.vendas = Number(index1.vendas);
    }

    console.log('Data Base 1:', index1);
    console.log('Data Base 2:', index2);

    const Corrigido1 = './dados_corrigidos_1.json';
    const Corrigido2 = './dados_corrigidos_2.json';
    await exportToJson(index1, Corrigido1);
    await exportToJson(index2, Corrigido2);
  } catch (err) {
    console.error(`Erro ao ler as Datas Base ${err}`);
  }
}

function corrigindoDados(conteudo) {
  return conteudo
    .replace(/"vendas": "(\d+)"/g, '"vendas": $1')
    .replace(/æ/g, 'a')
    .replace(/ø/g, 'o');
}

async function exportToJson(data, outputPath) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(outputPath, jsonData, 'utf-8');
    console.log(` ${outputPath}`);
  } catch (err) {
    console.error(` ${outputPath}: ${err}`);
  }
}

const caminhoArq1 = './broken_database_1.json';
const caminhoArq2 = './broken_database_2.json';
BrokenBase(caminhoArq1, caminhoArq2);