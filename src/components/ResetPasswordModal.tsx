import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { Modal } from "./Modal";
import { TextField } from "./TextField";
import { Button } from "./Button";
import { AlertBanner } from "./AlertBanner";
import { adminUpdatePasswordSchema, type AdminUpdatePasswordFormValues } from "../schemas/admin";
import { updateUserPassword } from "../api/admin";
import { getApiErrorMessage } from "../lib/api-client";
import type { User } from "../types/auth";

export function ResetPasswordModal({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminUpdatePasswordFormValues>({
    resolver: zodResolver(adminUpdatePasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (values: AdminUpdatePasswordFormValues) =>
      updateUserPassword(user!.id, { password: values.password }),
    onSuccess: () => {
      reset();
      setSuccess(true);
      setApiError(null);
    },
    onError: (error) => {
      setApiError(getApiErrorMessage(error));
      setSuccess(false);
    },
  });

  const handleClose = () => {
    reset();
    setApiError(null);
    setSuccess(false);
    onClose();
  };

  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Redefinir senha"
      description={`Defina uma nova senha para ${user.name}.`}
    >
      {success ? (
        <div className="flex flex-col gap-5">
          <AlertBanner variant="success" message="Senha redefinida com sucesso." />
          <div className="flex justify-end">
            <Button type="button" onClick={handleClose}>
              Concluir
            </Button>
          </div>
        </div>
      ) : (
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
            label="Nova senha"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            icon={<Lock size={18} />}
            error={errors.password?.message}
            {...register("password")}
          />
          <TextField
            label="Confirmar nova senha"
            type="password"
            autoComplete="new-password"
            icon={<Lock size={18} />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <div className="mt-1 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={isSubmitting || mutation.isPending}>
              Redefinir senha
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
