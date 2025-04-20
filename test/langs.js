import assert from 'assert';
import * as langsUtils from '../lib/langs.js';

describe('Languages normalization', function () {
  const langs = langsUtils.normalize([
    {
      title: "French"
    },
    {
      title: "English",
      path: "en/"
    },
    {
      title: "German",
      path: "./de"
    }
  ]);

  it('should filter entries without path', function() {
    assert(langs.length == 2);
  });

  it('should return all necessary properties', function() {
    langs.forEach(lang => {
      assert(lang.title);
      assert(lang.path);
      assert(lang.lang);
    });
  });

  it('should correctly normalize lang', function() {
    assert.equal(langs[0].lang, "en");
    assert.equal(langs[1].lang, "de");
  });
});
