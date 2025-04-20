# HonKit Light Parsers

[![NPM version](https://badge.fury.io/js/%40honkit%2Flight-parsers.svg)](http://badge.fury.io/js/%40honkit%2Flight-parsers) [![Build Status](https://travis-ci.org/honkit/honkit-light-parsers.png?branch=master)](https://travis-ci.org/honkit/honkit-light-parsers)

This node module unify the interface to use parsers. It's a light (simplified) implementation of parsers for HonKit:

| Parser | Version | Tests |
| ------ | ------- | ----- |
| [Markdown](https://github.com/GitbookIO/gitbook-markdown) | [![NPM version](https://badge.fury.io/js/gitbook-markdown.svg)](http://badge.fury.io/js/gitbook-markdown) | [![Build Status](https://travis-ci.org/GitbookIO/gitbook-markdown.png?branch=master)](https://travis-ci.org/GitbookIO/gitbook-markdown) |
| [AsciiDoc](https://github.com/GitbookIO/gitbook-asciidoc) | [![NPM version](https://badge.fury.io/js/gitbook-asciidoc.svg)](http://badge.fury.io/js/gitbook-asciidoc) | [![Build Status](https://travis-ci.org/GitbookIO/gitbook-asciidoc.png?branch=master)](https://travis-ci.org/GitbookIO/gitbook-asciidoc) |
| [reStructuredText](https://github.com/GitbookIO/gitbook-restructuredtext) | [![NPM version](https://badge.fury.io/js/gitbook-restructuredtext.svg)](http://badge.fury.io/js/gitbook-restructuredtext) | [![Build Status](https://travis-ci.org/GitbookIO/gitbook-restructuredtext.png?branch=master)](https://travis-ci.org/GitbookIO/gitbook-restructuredtext) |


### How to use it?

This module can be used in **node.js** and in the **browser**

##### In the Browser:

Include the file:

```
<script type="module">
  import honkitParsers from './@honkit-light-parsers.js';
  // Use honkitParsers here
</script>
```

##### In Node.js:

```
npm install @honkit/light-parsers
```

Then include it using:

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
