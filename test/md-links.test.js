const mdLinks = require('../index.js');

test('deberia retornar los links del archivo con extension md', () => {
  expect(mdLinks(path, options)).toBe(answer);
});
