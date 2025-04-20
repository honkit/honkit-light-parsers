import path from 'path';

import markdown from '@honkit/markdown-legacy';
import asciidoc from '@honkit/asciidoc';

import * as summaryUtils from './summary.js';
import * as glossaryUtils from './glossary.js';
import * as langsUtils from './langs.js';

// This list is ordered by priority of parsers to use
const PARSERS = [
  {
    name: "markdown",
    extensions: [".md", ".markdown", ".mdown"],
    parser: markdown
  },
  {
    name: "asciidoc",
    extensions: [".adoc", ".asciidoc"],
    parser: asciidoc
  }
]
.filter(type => 
  type.parser && 
  type.parser.summary && 
  type.parser.page &&
  type.parser.glossary && 
  type.parser.readme
)
.map(type => composeType(type));

function wrapPromise(func) {
  return (...args) => {
    return Promise.resolve().then(() => {
      return func(...args);
    });
  };
}

// Prepare and compose a parser
function composeType(type) {
  const parser = type.parser;
  const nparser = {
    name: type.name,
    extensions: type.extensions
  };

  nparser.glossary = wrapPromise(input => glossaryUtils.normalize(parser.glossary(input)));
  nparser.glossary.toText = wrapPromise(parser.glossary.toText);

  const oldSummaryParser = wrapPromise(parser.summary);
  nparser.summary = function(src, options) {
    return oldSummaryParser(src)
      .then(summary => {
        return summaryUtils.normalize(summary, options);
      });
  };
  nparser.summary.toText = wrapPromise(parser.summary.toText);

  nparser.langs = wrapPromise(input => langsUtils.normalize(parser.langs(input)));
  nparser.langs.toText = wrapPromise(parser.langs.toText);

  nparser.readme = wrapPromise(parser.readme);
  nparser.page = wrapPromise(parser.page);

  return nparser;
}

// Return a specific parser according to an extension
function getParser(ext) {
  return PARSERS.find(input => input.extensions.includes(ext));
}

// Return parser for a file
function getParserForFile(filename) {
  return getParser(path.extname(filename));
}

export default {
  all: PARSERS,
  extensions: PARSERS.flatMap(parser => parser.extensions),
  get: getParser,
  getForFile: getParserForFile,
  glossary: {
    entryId: glossaryUtils.entryId
  }
};
