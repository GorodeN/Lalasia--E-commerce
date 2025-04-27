import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authStore } from 'store/AuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes } from 'config/routes';
import Input from 'components/Input';
import Button from 'components/Button';
import styles from 'pages/Auth/Auth.module.scss';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Required'),
  password: z.string().min(6, 'At least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const success = await authStore.login(data);
    if (success) {
      navigate(location.state?.from || routes.main.create());
    }
  };

  const identifier = watch('identifier');
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__formInner}>
      <Input
        value={identifier}
        onChange={(value) => setValue('identifier', value)}
        placeholder="Email or Username"
        error={errors.identifier?.message}
        autoComplete="username"
      />
      <Input
        type="password"
        value={password}
        onChange={(value) => setValue('password', value)}
        placeholder="Password"
        error={errors.password?.message}
        autoComplete="current-password"
      />
      <Button type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
