const createEntriesText = length =>
  length !== 0 && length > 1 ? `${length} entries` : '1 entry';

export const writeToFile = async (text, type, number) => {
  try {
    const clonedText = text.slice(1);
    const doesMatch = [];
    const doesNotMatch = [];

    clonedText.map(t => {
      const splitBy = type === 'CSV' ? ',' : '\t';
      const check = t.split(splitBy);
      if (check.length === number) {
        doesMatch.push(check.join(splitBy));
      } else {
        doesNotMatch.push(check.join(splitBy));
      }
    });

    if (doesMatch.length > 0) {
      await fetch('/correct', {
        method: 'POST',
        body: doesMatch.join('\n')
      });
      alert(`Created correct file with ${createEntriesText(doesMatch.length)}`);
    }

    if (doesNotMatch.length > 0) {
      await fetch('/incorrect', {
        method: 'POST',
        body: doesNotMatch.join('\n')
      });
      alert(
        `Created incorrect file with ${createEntriesText(doesNotMatch.length)}`
      );
    }
  } catch (err) {
    console.error('Oops I did it again...', err);
  }
};

export const openFile = (event, setText) => {
  const input = event.target;

  const reader = new FileReader();
  reader.onload = function() {
    const text = reader.result;
    setText(text.split('\n'));
  };
  reader.readAsText(input.files[0]);
};
