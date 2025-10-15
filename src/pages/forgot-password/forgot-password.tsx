import { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

export const ForgotPassword: FC = () => {
  const [form, handleChange] = useForm({ email: '' });
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi({ email: form.email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={form.email}
      setEmail={(value) =>
        handleChange({ target: { name: 'email', value } } as any)
      }
      handleSubmit={handleSubmit as any}
    />
  );
};
