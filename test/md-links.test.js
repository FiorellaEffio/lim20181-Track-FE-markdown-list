const mdLinks = require('../index.js');

test('deberia retornar los links del archivo con extension md',async () => {
  answer = [ { fileName: 'C:\\Users\\Fiorella\\Documents\\lim20181-Track-FE-markdown-list\\test\\hola\\index.md',
    lineNumber: 2,
    href: 'https://www.google.com.pe',
    text: 'Google' },
    { fileName: 'C:\\Users\\Fiorella\\Documents\\lim20181-Track-FE-markdown-list\\test\\hola\\index.md',
      lineNumber: 3,
      href: 'https://www.google.com.pe',
      text: 'Google' }];

  await mdLinks('test',{validate:false, stats:false}).then((respuesta) => {
    expect(respuesta).toEqual(answer)
  })
}, 5000);

test('deberia decirme que no es archivo md para index.js',async () => {
  answer = 'No es archivo markdown';

  await mdLinks('index.js',{validate:false, stats:false}).then((respuesta) => {
    expect(respuesta).toEqual(answer)
  })
}, 5000);

//
// test('deberia retornar los links con sus validaciones', async () => {
//   answer2 = [ { fileName: 'C:\\Users\\Fiorella\\Documents\\lim20181-Track-FE-markdown-list\\test\\hola\\index.md',
//     lineNumber: 2,
//     href: 'https://www.google.com.pe',
//     text: 'Google',
//     statusText: 'OK',
//     statusCode: 200 } ];
//
//   await mdLinks('test',{validate:true, stats:false}).then((respuesta) => {
//     expect(respuesta).toEqual(answer2)
//   })
// }, 10000);
// //
// test('deberia retornar las estadisticas(total, repetidos) de los links', async () => {
//   answer = { unique: 1, total: 1, broken: 0 };
//   await mdLinks('links.md', {validate:true, stats: true}).then((respuesta) => {
//   expect(respuesta).toEqual(answer);
//   })
// });
//
test('deberia retornar las stats y validaciones para los links del archivo md', async () => {
  answer = { unique: 1, total: 1, broken: 0 };
  await mdLinks('test', {validate: true, stats: true}).then((respuesta) => {
  expect(respuesta).toEqual(answer);
  })
});
