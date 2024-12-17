import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
export const authFetch = async (
  url: string,
  options: RequestInit = {},
  refreshed?: boolean,
): Promise<Response | null> => {
  const token = sessionStorage.getItem('accessToken');
  const failReturn = () => {
    removeTokens();
    window?.location.replace('/admin/login');
    return null;
  };
  if (token) {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    const resForRead = await fetch(url, { ...options, headers });
    const copiedRes = resForRead.clone();
    const data = await resForRead.json();
    if (data.code === 401) {
      if (refreshed) {
        console.log('refreshed fail');
        return failReturn();
      } else {
        const res = await refreshToken();
        const data = await res.json();
        if (data.code === 200) {
          const token = data.data.accessToken;
          const refreshToken = data.data.refreshToken;
          setTokens(token, refreshToken);
          // note. 꼭 true로 설정해줘야 함 안그러면 무한루프
          return await authFetch(url, options, true);
        } else {
          console.log('refreshing fail');
          return failReturn();
        }
      }
    }
    return copiedRes;
  } else {
    console.log('no token');
    return failReturn();
  }
};
const refreshToken = async () => {
  const refreshToken = sessionStorage.getItem('refreshToken');
  const res = await fetch('/api/refreshes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return res;
};
export const setTokens = (token: string, refreshToken: string) => {
  sessionStorage.setItem('accessToken', token);
  sessionStorage.setItem('refreshToken', refreshToken);
};
export const removeTokens = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
};

export const checkIsTokenValid = () => {
  const token = sessionStorage.getItem('accessToken');
  const failReturn = () => {
    removeTokens();
    window?.location.replace('/admin/login');
  };
  if (!token) {
    failReturn();
    return;
  } else {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      failReturn();
      return;
    }
    // note. 3시간 전에 토큰이 만료되면 강제로 로그아웃
    const dayjsExp = dayjs(decoded.exp * 1000);
    if (dayjsExp.isBefore(dayjs().add(3, 'h'))) {
      failReturn();
      return;
    }
  }
};
