import XRegExp from 'xregexp';
import merge from 'lodash.merge';
import balancedMatch from 'balanced-match';

export default function nameParser(string, position) {
  const results = {};
  let fullNameMatch, defaultValueMatch;

  if (string[position] === '[') {
    fullNameMatch = balancedMatch('[', ']', string.substr(position));

    if (!fullNameMatch) {
      return;
    }

    defaultValueMatch = fullNameMatch.body.match(/^([\w\.\[\]]+)=(.*)$/);

    if (defaultValueMatch) {
      results.name = defaultValueMatch[1];
      results.defaultValue = defaultValueMatch[2]
    } else {
      results.name = fullNameMatch.body;
    }

    results.optional = true;

    return {
      lastIndex: position + fullNameMatch.end,
      results,
    };
  }

  fullNameMatch = string.substr(position).match(/^[\w\.\[\]]+/);

  if (!fullNameMatch) {
    return;
  }

  return {
    lastIndex: position + fullNameMatch.length,
    results: {
      name: fullNameMatch[0],
    }
  };
}
