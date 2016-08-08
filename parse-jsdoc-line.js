import merge from 'lodash.merge';

import tagNameParser from './parser-tag-name';
import typeParser from './parser-type';
import descriptionParser from './parser-description';
import nameParser from './parser-name';

const parsers = [];

function parse(parsers, string, position, currentResults) {
  const results = {};

  for (const parser of parsers) {
    const value = parser(string, position, currentResults);

    if (value) {
      const remainingParsers = merge([], parsers);
      remainingParsers.splice(parsers.indexOf(parser), 1);

      results.value = value;
      results.remainingParsers = remainingParsers;

      return results;
    }
  }

  return { remainingParsers: parsers };
}

export default function parseJSDocLine(string, opts) {
  const irregularCharacters = /(?:^|\s)(.)/g;
  let char;
  let results = {};
  let parsers = [
    tagNameParser,
    typeParser,
    nameParser,
    descriptionParser,
  ];

  while (char = irregularCharacters.exec(string)) {
    const position = char.index + (char[0][0] === ' ' ? 1 : 0);
    const { remainingParsers, value } = parse(parsers, string, position, results);

    if (value) {
      parsers = remainingParsers;
      merge(results, true, value.results);
      irregularCharacters.lastIndex = value.lastIndex;
    }

    // console.log(char, irregularCharacters.lastIndex)
  }

  return results;
}
