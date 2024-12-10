import { useMemo, useState } from 'react';

type Props = {};

const useLogin = (props: Props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isButtonActive = useMemo(() => {
    return id.length > 0 && password.length > 0;
  }, [id, password]);
  return {
    id,
    setId,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isButtonActive,
  };
};

export default useLogin;
