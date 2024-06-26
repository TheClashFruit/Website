import showdown from 'showdown';

showdown.extension('header-anchors', function() {
  let ancTpl = '$1<div class="sectionLink" aria-hidden="true"><a href="#$3">#</a></div>$4';

  return [{
    type: 'html',
    regex: /(<h([1-6]) id="([^"]+?)">)(.*<\/h\2>)/g,
    replace: ancTpl
  }];
});

showdown.extension('improved-tables', function() {
  let ancTpl = '<div class="tableWrapper">$1</div>';

  return [{
    type: 'html',
    regex: /(<table>[\s\S]*?<\/table>)/g,
    replace: ancTpl
  }];
});

showdown.extension('custom-emoji', function() {
  let ancTpl = '<span class="customEmoji" aria-label="$2"><img src="/emoji/$3/$2.png" alt="$1" /></span>';

  return [{
    type: 'html',
    regex: /(:((floof|neofox)(_*)([^:]*)):)/g,
    replace: ancTpl
  }];
});

showdown.extension('timestamp', function() {
  return [{
    type: 'lang',
    regex: /<t:([^>]+)>/g,
    replace: function(match, timestamp) {
      const date = new Date(Number(timestamp));

      return date.toLocaleString();
    }
  }];
});