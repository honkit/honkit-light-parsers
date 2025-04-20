import assert from 'assert';
import parser from '../../lib/index.js';

describe('Parser summary function', function () {
  it('should parse a markdown list with link correctly', async function() {
    const content = "* [An entry](./test.md)";
    
    const summary = await parser.get('.md').summary(content);
    
    assert(summary.chapters, "Summary should have chapters");
    assert(summary.chapters.length === 2, "Summary should have 2 chapters (including default introduction)");
    
    const parsedEntry = summary.chapters[1];
    assert.equal(parsedEntry.title, "An entry", "Title should be correctly parsed");
    assert.equal(parsedEntry.path, "./test.md", "Path should be correctly parsed");
    assert.equal(parsedEntry.level, "1", "Level should be correctly set");
    assert.equal(parsedEntry.articles.length, 0, "Entry should not have sub-articles");
    assert.equal(parsedEntry.external, false, "Entry should not be marked as external");
    
    const introChapter = summary.chapters[0];
    assert.equal(introChapter.title, "Introduction", "Introduction title should be set");
    assert.equal(introChapter.path, "README.md", "Introduction path should be README.md");
    assert.equal(introChapter.level, "0", "Introduction level should be 0");
  });
});
