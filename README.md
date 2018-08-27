# FiorellaEffio/md-links library

Esta librería permite identificar urls rotas y correctas de archivos con extensión md.
Para implementar esta librería desarrollé historias de usuarios que me permitieron reconocer cuales eran las tareas
que debía realizar para el proyecto.

1. Yo como usuario de npm me gustaría tener una librería que tenga detallado sus dependencias para saber que debo instalar.
Milestone : 1 Configuraciones de archivos para la librería.

2. Yo como usuario de npm me gustaría probar mediante test si algunas funciones son lo que estoy buscando o no.
Milestone : 2 Configuraciones de archivos para test con jest.

3. Yo como usuario de npm me gustaría tener una libreria que me permita buscar todos los archivos md dentro de una carpeta.
Milestone : 5 y 6 Recorrer carpetas, verificar si son archivos o carpetas nuevamente y almacenar en un array los archivos con coincidencia en la extensión.

4. Yo como usuario de npm me gustaría tener una libreria que me permita listar las URL de los archivos markdown que le pase.
Milestone : 4 Buscar las URL dentro de un archivo md.

5. Yo como usuario de npm me gustaría tener una libreria que identifique de todos los url quienes son correctos y quienes estan rotos.
Milestone : 3 Validar una URL si esta rota o no.

6. Yo como usuario de npm me gustaría tener una libreria que contabilice las url que se repiten, la cantidad total.
Milestone : 7 Contabilizar en el objeto del archivo las propiedades total, unique.

## Instalación

Por el momento localmente se puede hacer uso de esta librería.
Para instalar las dependencias del proyecto, una vez descargado ejecutar en la linea de comandos

```bash
npm install
```

Las dependencias estan detalladas en el archivo package.json

##Uso en la línea de comandos

Para ejecutar el archivo cli.js ejecutamos

```bash
npm link
```

Finalmente para reconocer archivos md con urls ejecutamos

```bash
md-links <ruta-del-archivo>
```

Por defecto si no le pasamos ningun parametro se ejecuta en el directorio actual.

##Para uso dentro de tu proyecto

```js
let mdLinks = require('./index.js')
```

### Documentación requerida

En el archivo _README_ de tu proyecto tendrás que incluir:

- Descripción general de la librería.
- Instrucciones de instalación.
- Versiones de la librería.
- Documentación de la Librería (Features, link de Demo, test, etc...).
- Ejemplos (_snippets_) de uso.

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, debe resolverse como relativa al directorio desde donde se invoca node - _currentworking directory_).

### CLI (Línea de comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto debe analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto un ejecutable como una interfaz que podamos importar con `require`
para usarlo programáticamente.

## Hacker edition

- Puedes agregar más estadísticas.
- Integración continua con Travis o Circle CI.

### `README.md`

- [ ] Un board con el backlog para la implementación de la librería.
- [ ] Documentación técnica de la librería.
- [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [ ] El módulo exporta una función con la interfaz (API) esperada.
- [ ] Implementa soporte para archivo individual
- [ ] Implementa soporte para directorios
- [ ] Implementa `options.validate`
- [Marked](https://github.com/markedjs/marked/blob/master/docs/USING_PRO.md)
### CLI

- [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [ ] Se ejecuta sin errores / output esperado
- [ ] Implementa `--validate`
- [ ] Implementa `--stats`
- [ ] Implementa `--validate --stats`
- [ ] Implementa `--stats --validate`

### Pruebas / tests

- [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
      lines, y branches.
- [ ] Pasa tests (y linters) (`npm test`).
- [Marked](https://github.com/markedjs/marked/blob/master/docs/USING_PRO.md)
