const mdLinks = require('../index.js');

test('deberia retornar los links del archivo con extension md',async () => {
  answer = [ { fileName: 'C:\\Users\\Fiorella\\Documents\\lim20181-Track-FE-markdown-list\\test\\hola\\index.md',
    lineNumber: 2,
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Crear módulos en Node.js' } ];

  await mdLinks('test',{validate:false, stats:false}).then((respuesta) => {

    expect(respuesta).toEqual(answer)
  })
}, 10000);

describe('Test', () => {
  test('timeout', async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
  }, 500);
});
//
// test('deberia retornar los estados (ok o fail) para los links del archivo md', () => {
//   answer = [{href:'https://www.google.com', text:'Este link te redirige a google ', file:'links.md', status: 'ok'}];
//   expect(mdLinks('links.md', {validate: true})).toBe(answer);
// });
//
// test('deberia retornar las estadisticas(total, repetidos) de los links', () => {
//   answer = [{href:'https://www.google.com', text:'Este link te redirige a google ', file:'links.md', total: 1, unique: 1}];
//   expect(mdLinks('links.md', {stats: true})).toBe(answer);
// });
//
// test('deberia retornar las estadisticas(total, repetidos, rotos) para los links del archivo md', () => {
//   answer = [{href:'https://www.google.com', text:'Este link te redirige a google ', file:'links.md', total:1, unique: 1, broken:0}];
//   expect(mdLinks('links.md', {validate: true, stats: true})).toBe(answer);
// });

// falta escribir test para cuando la ruta(path) es una carpeta
