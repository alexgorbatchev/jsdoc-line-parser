import balancedMatch from 'balanced-match';

export default function typeParser(string, position) {
  if (string[position] !== '{') {
    return;
  }

  const match = balancedMatch('{', '}', string.substr(position)) || {};
  const { body } = match;
  const results = {};

  if (!body) {
    return;
  }

  // parses multiple types in the `(type1|type2|type3)` format
  if (body[0] === '(') {
    let types = balancedMatch('(', ')', body);

    if (types) {
      results.types = types.body.split(/\|/g);
    }
  } else {
    results.types = [ match.body ];
  }

  results.types = results.types.map(type => {
    // detect repeatable type
    if (type.indexOf('...') === 0) {
      results.repeatable = true;
      type = type.substr(3);
    }

    // detect optional type that ends with '='
    if (type.substr(-1) === '=') {
      results.optional = true;
      type = type.substr(0, type.length - 1);
    }

    return type;
  });

  return {
    lastIndex: match.end,
    results,
  };
}
