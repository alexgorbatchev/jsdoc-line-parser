import XRegExp from 'xregexp';

export default function descriptionParser(string, position, currentResults) {
  let match;

  if (string[position] === '-') {
    match = string.substr(position).match(/-\s*(.*)$/);
  }

  if (!match && currentResults.name) {
    match = string.substr(position).match(/(.*)$/);
  }

  if (!match) {
    return;
  }

  return {
    lastIndex: position + match.length,
    results: {
      description: match[1]
    }
  };
}
