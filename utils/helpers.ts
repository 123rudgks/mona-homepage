export const base64ToFile = (base64: string, filename: string) => {
  // Base64 문자열에서 "data:image/png;base64," 부분 제거
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || ''; // MIME 타입 추출
  const bstr = atob(arr[1]); // Base64 디코딩
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // 디코딩된 데이터를 Uint8Array로 변환
  }
  // Blob을 사용해 File 객체 생성
  return new File([u8arr], filename, { type: mime });
};

export const urlToFile = async (url: string, fileName: string) => {
  try {
    const response = await fetch('/admin/image-api/?url=' + url);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.log('error', error);
  }
};

// 30분 간격 시간 리스트 생성
export const generateTimeList = () => {
  const result: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourString = hour.toString().padStart(2, '0');
      const minuteString = minute.toString().padStart(2, '0');
      result.push(`${hourString}:${minuteString}`);
    }
  }
  return result;
};
