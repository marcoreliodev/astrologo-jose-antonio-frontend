import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { User, Mail, KeyRound, ShieldCheck, CalendarDays } from "lucide-react";
import { AppHeader } from "../components/AppHeader";
import { ProfileCard } from "../components/ProfileCard";
import { TextField } from "../components/TextField";
import { PhoneField } from "../components/PhoneField";
import { Button } from "../components/Button";
import { AlertBanner } from "../components/AlertBanner";
import { profileSchema, passwordSchema, type ProfileFormValues, type PasswordFormValues } from "../schemas/auth";
import { updatePassword, updateProfile } from "../api/auth";
import { getApiErrorMessage } from "../lib/api-client";
import { useAuth } from "../context/AuthContext";

const roleLabels: Record<string, string> = {
  user: "Cliente",
  admin: "Administrador",
};

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const memberSince = new Date(user.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-offwhite">
      <AppHeader />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
              Meu perfil
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-noturno">
              {user.name}
            </h1>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-noturno text-offwhite">
              <ShieldCheck size={18} />
            </span>
            <div className="text-sm">
              <p className="font-semibold text-noturno">{roleLabels[user.role] ?? user.role}</p>
              <p className="flex items-center gap-1 text-ink-soft">
                <CalendarDays size={13} />
                desde {memberSince}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ProfileInfoCard />
          <PasswordCard />
        </div>
      </main>
    </div>
  );
}

function ProfileInfoCard() {
  const { user, setUser } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, phone: user.phone });
    }
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      reset({ name: updatedUser.name, email: updatedUser.email, phone: updatedUser.phone });
      setSuccess(true);
      setApiError(null);
      window.setTimeout(() => setSuccess(false), 4000);
    },
    onError: (error) => {
      setApiError(getApiErrorMessage(error));
      setSuccess(false);
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    setApiError(null);
    mutation.mutate(values);
  };

  return (
    <ProfileCard
      title="Dados pessoais"
      description="Mantenha seu nome, e-mail e telefone atualizados."
      icon={<User size={18} />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {apiError && <AlertBanner message={apiError} />}
        {success && <AlertBanner variant="success" message="Perfil atualizado com sucesso." />}

        <TextField
          label="Nome completo"
          autoComplete="name"
          icon={<User size={18} />}
          error={errors.name?.message}
          {...register("name")}
        />

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          {...register("email")}
        />

        <PhoneField control={control} name="phone" error={errors.phone?.message} />

        <div className="flex justify-end">
          <Button type="submit" isLoading={mutation.isPending} disabled={!isDirty}>
            Salvar alterações
          </Button>
        </div>
      </form>
    </ProfileCard>
  );
}

function PasswordCard() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      reset();
      setSuccess(true);
      setApiError(null);
      window.setTimeout(() => setSuccess(false), 4000);
    },
    onError: (error) => {
      setApiError(getApiErrorMessage(error));
      setSuccess(false);
    },
  });

  const onSubmit = (values: PasswordFormValues) => {
    setApiError(null);
    mutation.mutate({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <ProfileCard
      title="Segurança"
      description="Atualize sua senha periodicamente para manter sua conta protegida."
      icon={<KeyRound size={18} />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {apiError && <AlertBanner message={apiError} />}
        {success && <AlertBanner variant="success" message="Senha atualizada com sucesso." />}

        <TextField
          label="Senha atual"
          type="password"
          autoComplete="current-password"
          icon={<KeyRound size={18} />}
          error={errors.currentPassword?.message}
          {...register("currentPassword")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Nova senha"
            type="password"
            autoComplete="new-password"
            icon={<KeyRound size={18} />}
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <TextField
            label="Confirmar nova senha"
            type="password"
            autoComplete="new-password"
            icon={<KeyRound size={18} />}
            error={errors.confirmNewPassword?.message}
            {...register("confirmNewPassword")}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={mutation.isPending}>
            Atualizar senha
          </Button>
        </div>
      </form>
    </ProfileCard>
  );
}
