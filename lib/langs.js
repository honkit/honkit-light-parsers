import path from 'path';

// Normalize langs
function normalize(entries) {
  return entries
    .filter(entry => Boolean(entry.path))
    .map(entry => {
      return {
        title: entry.title.trim(),
        path: entry.path,
        lang: path.basename(entry.path)
      };
    });
}

export {
  normalize
};
