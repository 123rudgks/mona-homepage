import { setTokens } from '@/utils/apis';
import { useCallback, useMemo, useState } from 'react';

type Props = {};

const useLogin = (props: Props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<Array<'id' | 'pw'>>([]);
  const isButtonActive = useMemo(() => {
    return id.length > 0 && password.length > 0;
  }, [id, password]);
  const postLogin = useCallback(async (username: string, password: string) => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    if (data.code === 200) {
      const token = data.data.accessToken;
      const refreshToken = data.data.refreshToken;
      setTokens(token, refreshToken);
      setError([]);
      window.location.replace('/admin/business-solution/condition-diagnosis');
    } else {
      if (
        data.data ===
        '해당 데이터를 찾을 수 없습니다. : 존재하지 않는 아이디입니다.'
      ) {
        setError(['id']);
      } else if (
        data.data === '유효하지 않은 값입니다. : 비밀번호가 일치하지 않습니다.'
      ) {
        setError(['pw']);
      }
    }
  }, []);
  return {
    id,
    setId,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isButtonActive,
    postLogin,
    error,
  };
};

export default useLogin;
