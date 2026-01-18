// Test the tags parsing logic

const testCases = [
  'tags: ["machine-learning", "credit-risk", "python", "data-science", "finance"]',
  'tags: ["career", "transition", "physics", "software-engineering", "personal"]',
];

testCases.forEach((line) => {
  console.log('Testing:', line);

  const colonIndex = line.indexOf(':');
  if (colonIndex > 0) {
    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();
    const cleanKey = key.toLowerCase();

    console.log('  Key:', key);
    console.log('  Value:', value);
    console.log(
      '  Value chars:',
      Array.from(value).map((c) => c.charCodeAt(0)),
    );

    if (cleanKey === 'tags') {
      const trimmedValue = value.trim();
      console.log('  Trimmed value:', trimmedValue);
      console.log('  Starts with [:', trimmedValue.startsWith('['));
      console.log('  Ends with ]:', trimmedValue.endsWith(']'));

      if (trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) {
        try {
          const parsed = JSON.parse(trimmedValue);
          console.log('  Parsed successfully:', parsed);
        } catch (e) {
          console.log('  Parse error:', e.message);
        }
      }
    }
  }
  console.log('---');
});
