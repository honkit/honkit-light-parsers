import url from 'url';

// Is the link an external link
const isExternal = function(href) {
  try {
    return Boolean(url.parse(href).protocol);
  } catch(err) { }

  return false;
};

function defaultChapterList(chapterList, entryPoint) {
  const first = chapterList[0];

  // Check if introduction node was specified in SUMMARY.md
  if (first && first.path == entryPoint) {
    return chapterList;
  }

  // It wasn't specified, so add in default
  return [
    {
      path: entryPoint,
      title: 'Introduction'
    }
  ].concat(chapterList);
}

function normalizeChapters(chapterList, options, level, base) {
  let i = base || 0;
  return chapterList.map(chapter => {
    chapter.level = (level? [level || "", i] : [i]).join(".");
    chapter.external = isExternal(chapter.path);
    chapter.exists = (chapter.external || !options.files || options.files.includes(chapter.path));

    i = i + 1;
    return {
      path: chapter.path,
      title: chapter.title.trim(),
      level: chapter.level,
      articles: normalizeChapters(chapter.articles || [], options, chapter.level, 1),
      exists: chapter.exists,
      external: chapter.external,
      introduction: chapter.path == options.entryPoint
    };
  });
}

function normalizeSummary(summary, options) {
  options = Object.assign({
    entryPoint: "README.md",
    files: null
  }, options || {})

  if (Array.isArray(summary)) summary = { chapters: summary };
  summary.chapters = defaultChapterList(summary.chapters, options.entryPoint);
  summary.chapters = normalizeChapters(summary.chapters, options);
  return summary;
}

export { normalizeSummary as normalize };
