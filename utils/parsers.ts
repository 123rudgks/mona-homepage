export function extractTextFromHTML(html: string): string {
  // HTML 문자열을 DOM으로 변환
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // img, video 태그를 제거
  doc.querySelectorAll('img, video').forEach((el) => el.remove());

  // 텍스트만 추출
  return doc.body.textContent?.trim() || ''; // 텍스트가 없으면 빈 문자열 반환
}
