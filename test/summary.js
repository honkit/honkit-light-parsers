import assert from 'assert';
import * as summaryUtils from '../lib/summary.js';

describe('Summary normalization', function () {
  it('should normalize array format summary', function() {
    const summary = summaryUtils.normalize([
      {
        title: "Chapter 1",
        path: "chapter1.md"
      },
      {
        title: "Chapter 2",
        path: "chapter2.md"
      }
    ]);

    assert(summary.chapters);
    assert(summary.chapters.length === 3); // Including default introduction
    assert.equal(summary.chapters[0].title, "Introduction");
    assert.equal(summary.chapters[0].path, "README.md");
    assert.equal(summary.chapters[1].title, "Chapter 1");
    assert.equal(summary.chapters[1].path, "chapter1.md");
  });

  it('should normalize object format summary', function() {
    const summary = summaryUtils.normalize({
      chapters: [
        {
          title: "Chapter 1",
          path: "chapter1.md"
        },
        {
          title: "Chapter 2",
          path: "chapter2.md"
        }
      ]
    });

    assert(summary.chapters);
    assert(summary.chapters.length === 3); // Including default introduction
    assert.equal(summary.chapters[0].title, "Introduction");
    assert.equal(summary.chapters[0].path, "README.md");
  });

  it('should not add introduction if already exists', function() {
    const summary = summaryUtils.normalize([
      {
        title: "Custom Intro",
        path: "README.md"
      },
      {
        title: "Chapter 1",
        path: "chapter1.md"
      }
    ]);

    assert(summary.chapters);
    assert(summary.chapters.length === 2); // No additional introduction
    assert.equal(summary.chapters[0].title, "Custom Intro");
    assert.equal(summary.chapters[0].path, "README.md");
  });

  it('should respect custom entry point', function() {
    const summary = summaryUtils.normalize([
      {
        title: "Chapter 1",
        path: "chapter1.md"
      }
    ], { entryPoint: "INTRO.md" });

    assert(summary.chapters);
    assert(summary.chapters.length === 2); // Including default introduction
    assert.equal(summary.chapters[0].title, "Introduction");
    assert.equal(summary.chapters[0].path, "INTRO.md");
  });

  it('should mark external links', function() {
    const summary = summaryUtils.normalize([
      {
        title: "External Link",
        path: "https://example.com"
      },
      {
        title: "Internal Link",
        path: "chapter1.md"
      }
    ]);

    assert(summary.chapters);
    assert(summary.chapters.length === 3); // Including default introduction
    assert.equal(summary.chapters[1].external, true);
    assert.equal(summary.chapters[2].external, false);
  });

  it('should normalize nested chapters', function() {
    const summary = summaryUtils.normalize([
      {
        title: "Chapter 1",
        path: "chapter1.md",
        articles: [
          {
            title: "Section 1.1",
            path: "section1.1.md"
          },
          {
            title: "Section 1.2",
            path: "section1.2.md"
          }
        ]
      }
    ]);

    assert(summary.chapters);
    assert(summary.chapters.length === 2); // Including default introduction
    assert(summary.chapters[1].articles);
    assert(summary.chapters[1].articles.length === 2);
    assert.equal(summary.chapters[1].articles[0].title, "Section 1.1");
    assert.equal(summary.chapters[1].articles[0].path, "section1.1.md");
    assert.equal(summary.chapters[1].articles[0].level, "1.1");
    assert.equal(summary.chapters[1].articles[1].level, "1.2");
  });

  it('should check file existence', function() {
    const files = ["README.md", "chapter1.md"];
    const summary = summaryUtils.normalize([
      {
        title: "Chapter 1",
        path: "chapter1.md"
      },
      {
        title: "Chapter 2",
        path: "chapter2.md"
      }
    ], { files });

    assert(summary.chapters);
    assert(summary.chapters.length === 3); // Including default introduction
    assert.equal(summary.chapters[0].exists, true);
    assert.equal(summary.chapters[1].exists, true);
    assert.equal(summary.chapters[2].exists, false);
  });

  it('should trim chapter titles', function() {
    const summary = summaryUtils.normalize([
      {
        title: "  Chapter with spaces  ",
        path: "chapter1.md"
      }
    ]);

    assert(summary.chapters);
    assert(summary.chapters.length === 2); // Including default introduction
    assert.equal(summary.chapters[1].title, "Chapter with spaces");
  });
});
