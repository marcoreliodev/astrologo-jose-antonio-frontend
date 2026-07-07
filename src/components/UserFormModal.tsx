import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Mail, Lock } from "lucide-react";
import { Modal } from "./Modal";
import { TextField } from "./TextField";
import { PhoneField } from "./PhoneField";
import { Button } from "./Button";
import { AlertBanner } from "./AlertBanner";
import {
  adminCreateUserSchema,
  adminUpdateUserSchema,
  type AdminCreateUserFormValues,
  type AdminUpdateUserFormValues,
} from "../schemas/admin";
import { createUser, updateUser } from "../api/admin";
import { getApiErrorMessage } from "../lib/api-client";
import type { User as UserModel } from "../types/auth";

type UserFormModalProps = {
  open: boolean;
  onClose: () => void;
  /** Quando presente, o modal opera em modo de edição; quando ausente, em modo de criação. */
  user?: UserModel | null;
  onSuccess?: (user: UserModel) => void;
};

export function UserFormModal({ open, onClose, user, onSuccess }: UserFormModalProps) {
  const isEditing = Boolean(user);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Editar usuário" : "Novo usuário"}
      description={
        isEditing
          ? "Atualize os dados cadastrais do usuário."
          : "Preencha os dados para criar uma nova conta."
      }
    >
      {isEditing ? (
        <EditUserForm user={user!} onClose={onClose} onSuccess={onSuccess} />
      ) : (
        <CreateUserForm onClose={onClose} onSuccess={onSuccess} />
      )}
    </Modal>
  );
}

function CreateUserForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess?: (user: UserModel) => void;
}) {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminCreateUserFormValues>({
    resolver: zodResolver(adminCreateUserSchema),
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (createdUser) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      onSuccess?.(createdUser);
      onClose();
    },
    onError: (error) => setApiError(getApiErrorMessage(error)),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        setApiError(null);
        mutation.mutate(values);
      })}
      className="flex flex-col gap-5"
      noValidate
    >
      {apiError && <AlertBanner message={apiError} />}

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
      <TextField
        label="Senha"
        type="password"
        autoComplete="new-password"
        placeholder="Mínimo 6 caracteres"
        icon={<Lock size={18} />}
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="mt-1 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting || mutation.isPending}>
          Criar usuário
        </Button>
      </div>
    </form>
  );
}

function EditUserForm({
  user,
  onClose,
  onSuccess,
}: {
  user: UserModel;
  onClose: () => void;
  onSuccess?: (user: UserModel) => void;
}) {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AdminUpdateUserFormValues>({
    resolver: zodResolver(adminUpdateUserSchema),
    defaultValues: { name: user.name, email: user.email, phone: user.phone },
  });

  useEffect(() => {
    reset({ name: user.name, email: user.email, phone: user.phone });
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: (values: AdminUpdateUserFormValues) => updateUser(user.id, values),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      onSuccess?.(updatedUser);
      onClose();
    },
    onError: (error) => setApiError(getApiErrorMessage(error)),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        setApiError(null);
        mutation.mutate(values);
      })}
      className="flex flex-col gap-5"
      noValidate
    >
      {apiError && <AlertBanner message={apiError} />}

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

      <div className="mt-1 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting || mutation.isPending} disabled={!isDirty}>
          Salvar alterações
        </Button>
      </div>
    </form>
  );
}
