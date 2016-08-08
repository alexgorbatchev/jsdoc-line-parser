export default function tagNameParser(string, position) {
  if (string[position] !== '@') {
    return;
  }

  const match = string.substr(position).match(/^@(\w+)/);

  if (match) {
    return {
      lastIndex: position + match[0].length,
      results: {
        tag: match[1],
      },
    };
  }
}
