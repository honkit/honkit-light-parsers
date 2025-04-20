# HonKit Light Parsers

This node module unify the interface to use parsers. It's a light (simplified) implementation of parsers for HonKit:

| Parser | Repository |
| ------ | ---------- |
| Markdown | [honkit/markdown-legacy](https://github.com/honkit/honkit/tree/master/packages/%40honkit/markdown-legacy) |
| AsciiDoc | [honkit/asciidoc](https://github.com/honkit/honkit/tree/master/packages/%40honkit/asciidoc) |


### How to use it?

This module can be used in **node.js**

### Installation

```
npm install @honkit/light-parsers
```

### Usage

```js
import honkitParsers from '@honkit/light-parsers';
```

##### Get a parser for a file:

```js
var parser = gitbookParsers.getForFile("FILE.md");
```

##### Use this parser:

Parse the summary:

```js
parser.summary("* [An entry](./test.md)")
.then(function(summary) {

});
```

Parse the glossary:

```js
parser.glossary("...")
.then(function(glossary) {

});
```

Parse the languages index:

```js
parser.langs("...")
.then(function(languages) {

});
```

Parse a page to html:

```js
parser.page("...")
.then(function(sections) {

});
```
