export function extractFaqs(html) {
  const regex = /<summary>(.*?)<\/summary>\s*<p>(.*?)<\/p>/g;
  const faqs = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    faqs.push({
      question: match[1].trim(),
      answer: match[2].trim()
    });
  }
  return faqs;
}