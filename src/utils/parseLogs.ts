export function extractProgress(input: string) {
  const regex = /DDIM Sampler:\s+(\d+)%/g;
  let match, lastMatch;

  while ((match = regex.exec(input)) !== null) {
    lastMatch = match;
  }

  if (!lastMatch) {
    return null;
  }

  const number = parseInt(lastMatch[1]);
  return number;
}
