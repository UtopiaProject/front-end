
// trim trims the given string to a given maximum size,
// adding '...' at the end.
function trim(string, maximumSize) {
  if (string.length > maximumSize) {
    const substring = string.substring(0, maximumSize - 3);
    return `${substring}...`;
  }
  return string;
}

export default trim;
