import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, ShieldAlert, UserX } from "lucide-react";
import { LandingHeader } from "../components/LandingHeader";
import { AdminSubNav } from "../components/AdminSubNav";
import { Button } from "../components/Button";
import { AlertBanner } from "../components/AlertBanner";
import { RoleBadge } from "../components/RoleBadge";
import { Pagination } from "../components/Pagination";
import { UserRowActions } from "../components/UserRowActions";
import { UserFormModal } from "../components/UserFormModal";
import { ResetPasswordModal } from "../components/ResetPasswordModal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { MarsGlyph } from "../components/CosmicPanel";
import { listUsers, deleteUser, updateUserRole } from "../api/admin";
import { getApiErrorMessage } from "../lib/api-client";
import { useAuth } from "../context/AuthContext";
import type { User } from "../types/auth";

const LIMIT = 10;

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [formModal, setFormModal] = useState<{ open: boolean; user: User | null }>({
    open: false,
    user: null,
  });
  const [passwordModalUser, setPasswordModalUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [roleTarget, setRoleTarget] = useState<User | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["admin", "users", page, LIMIT],
    queryFn: () => listUsers({ page, limit: LIMIT }),
    placeholderData: (previous) => previous,
  });

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    if (!term) return data.data;
    return data.data.filter(
      (user) =>
        user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
    );
  }, [data, search]);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      setDeleteTarget(null);
      setActionError(null);
    },
    onError: (err) => setActionError(getApiErrorMessage(err)),
  });

  const roleMutation = useMutation({
    mutationFn: (target: User) =>
      updateUserRole(target.id, { role: target.role === "admin" ? "user" : "admin" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      setRoleTarget(null);
      setActionError(null);
    },
    onError: (err) => setActionError(getApiErrorMessage(err)),
  });

  return (
    <div className="min-h-screen bg-offwhite">
      <LandingHeader />
      <AdminSubNav />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
              Área administrativa
            </span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-noturno">
              Usuários
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Gerencie contas, permissões e acessos da plataforma.
            </p>
          </div>

          <Button onClick={() => setFormModal({ open: true, user: null })}>
            <Plus size={18} />
            Novo usuário
          </Button>
        </div>

        {actionError && (
          <div className="mb-5">
            <AlertBanner message={actionError} />
          </div>
        )}

        <div className="rounded-2xl border border-line bg-white">
          <div className="flex items-center gap-3 border-b border-line p-5">
            <div className="relative flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/50"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nome ou e-mail nesta página…"
                className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-[15px] text-ink placeholder:text-ink-soft/40 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/40"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-soft">
              <MarsGlyph className="h-7 w-7 animate-spin text-bronze" />
              <p className="text-sm">Carregando usuários…</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <ShieldAlert className="h-8 w-8 text-marte" />
              <p className="text-sm font-medium text-ink">{getApiErrorMessage(error)}</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-ink-soft">
              <UserX className="h-8 w-8" />
              <p className="text-sm">Nenhum usuário encontrado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    <th className="px-6 py-3.5">Nome</th>
                    <th className="px-6 py-3.5">E-mail</th>
                    <th className="px-6 py-3.5">Telefone</th>
                    <th className="px-6 py-3.5">Perfil</th>
                    <th className="px-6 py-3.5">Desde</th>
                    <th className="px-6 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-line last:border-0 hover:bg-noturno/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="font-medium text-ink">{user.name}</span>
                          {user.id === currentUser?.id && (
                            <span className="rounded-full bg-bronze-light/40 px-2 py-0.5 text-[11px] font-semibold text-bronze">
                              você
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-ink-soft">{user.email}</td>
                      <td className="px-6 py-4 text-ink-soft">{formatPhone(user.phone)}</td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-6 py-4 text-ink-soft">
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <UserRowActions
                          isAdmin={user.role === "admin"}
                          onEdit={() => setFormModal({ open: true, user })}
                          onResetPassword={() => setPasswordModalUser(user)}
                          onToggleRole={() => setRoleTarget(user)}
                          onDelete={() => setDeleteTarget(user)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data && (
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              total={data.total}
              limit={data.limit}
              onPageChange={setPage}
            />
          )}
          {isFetching && !isLoading && (
            <p className="px-6 pb-4 text-xs text-ink-soft">Atualizando…</p>
          )}
        </div>
      </main>

      <UserFormModal
        open={formModal.open}
        user={formModal.user}
        onClose={() => setFormModal({ open: false, user: null })}
      />

      <ResetPasswordModal
        open={Boolean(passwordModalUser)}
        user={passwordModalUser}
        onClose={() => setPasswordModalUser(null)}
      />

      <ConfirmDialog
        open={Boolean(roleTarget)}
        onClose={() => setRoleTarget(null)}
        onConfirm={() => roleTarget && roleMutation.mutate(roleTarget)}
        isLoading={roleMutation.isPending}
        title={roleTarget?.role === "admin" ? "Remover privilégio de admin" : "Conceder privilégio de admin"}
        description={
          roleTarget?.role === "admin"
            ? `${roleTarget?.name} deixará de ter acesso à área administrativa.`
            : `${roleTarget?.name} passará a ter acesso total à área administrativa.`
        }
        confirmLabel="Confirmar"
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        isLoading={deleteMutation.isPending}
        title="Excluir usuário"
        description={`Esta ação é permanente e não pode ser desfeita. Tem certeza que deseja excluir ${deleteTarget?.name}?`}
        confirmLabel="Excluir"
      />
    </div>
  );
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return phone;
}
