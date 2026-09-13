//NewsAPI sometimes cuts the text off in the middle of a sentence. 
//So, remove the incomplete ending so the paragraph ends with a full sentence.
export function truncateToLastSentence(text: string): string {
  const cleaned = text.replace(/…+\s*$/, '').trimEnd();

  const lastPunctuationIndex = Math.max(
    cleaned.lastIndexOf('.'),
    cleaned.lastIndexOf('!'),
    cleaned.lastIndexOf('?'),
  );

 // If the sentence, is not complete, keep the "…" to show that the text was cut off.
  if (lastPunctuationIndex === -1) {
    return `${cleaned}…`;
  }

  return cleaned.slice(0, lastPunctuationIndex + 1);
}
