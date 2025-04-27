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

const registerSchema = z.object({
  username: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const success = await authStore.register(data);
    if (success) {
      navigate(location.state?.from || routes.main.create());
    }
  };

  const username = watch('username');
  const email = watch('email');
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__formInner}>
      <Input
        value={username}
        onChange={(value) => setValue('username', value)}
        placeholder="Username"
        error={errors.username?.message}
        autoComplete="username"
      />
      <Input
        value={email}
        onChange={(value) => setValue('email', value)}
        placeholder="Email"
        error={errors.email?.message}
        autoComplete="email"
      />
      <Input
        value={password}
        onChange={(value) => setValue('password', value)}
        type="password"
        placeholder="Password"
        error={errors.password?.message}
        autoComplete="new-password"
      />
      <Button type="submit" disabled={isSubmitting}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
