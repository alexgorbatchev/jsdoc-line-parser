import XRegExp from 'xregexp';

const VALUE_TAGS = [
  'version',
  'author',
];

export default function valueParser(string, position, currentResults) {
  if (VALUE_TAGS.indexOf(currentResults.tag) !== -1) {
    const match = string.substr(position).match(/(.*)$/);

    return {
      lastIndex: position + match[0].length,
      results: {
        value: match[1]
      }
    };
  }
}
