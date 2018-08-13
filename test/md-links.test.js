const mdLinks = require('../index.js');

test('deberia retornar los links del archivo con extension md', () => {
  answer = [{href:'https://www.google.com', text:'Este link te redirige a google ', file:'links.md'}];
  expect(mdLinks('links.md')).toBe(answer);
});

test('deberia retornar los estados (ok o fail) para los links del archivo md', () => {
  answer = [{href:'https://www.google.com', text:'Este link te redirige a google ', file:'links.md', status: 'ok'}];
  expect(mdLinks('links.md', {validate: true})).toBe(answer);
});

test('deberia retornar las estadisticas(total, repetidos) de los links', () => {
  answer = [{href:'https://www.google.com', text:'Este link te redirige a google ', file:'links.md', total: 1, unique: 1}];
  expect(mdLinks('links.md', {stats: true})).toBe(answer);
});

test('deberia retornar las estadisticas(total, repetidos, rotos) para los links del archivo md', () => {
  answer = [{href:'https://www.google.com', text:'Este link te redirige a google ', file:'links.md', total:1, unique: 1, broken:0}];
  expect(mdLinks('links.md', {validate: true, stats: true})).toBe(answer);
});
