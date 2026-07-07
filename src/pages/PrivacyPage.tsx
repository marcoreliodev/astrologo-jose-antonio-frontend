import { LegalPageLayout } from "../components/LegalPageLayout";

export default function PrivacyPage() {
  return (
    <LegalPageLayout eyebrow="Documento legal" title="Política de Privacidade">
      <p>
        Esta Política de Privacidade explica como o Astrólogo José Antonio
        coleta, utiliza e protege os dados pessoais fornecidos por quem
        utiliza este site e seus serviços, em conformidade com a Lei Geral de
        Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </p>

      <h2>Proteção de Dados (LGPD) e Comunicações de Marketing</h2>
      <p>
        Todos os dados fornecidos pelo cliente no momento do registro no site
        (como nome, e-mail e WhatsApp) ou durante os atendimentos serão
        armazenados e tratados com o devido sigilo, em estrita conformidade
        com a Lei Geral de Proteção de Dados (LGPD).
      </p>
      <p>
        Ao se cadastrar para obter o Mapa Astral gratuito, o usuário autoriza
        e consente expressamente que o Astrólogo José Antonio utilize as
        informações de contato fornecidas para o envio de e-mails, mensagens,
        newsletters, ofertas de serviços, avisos de lançamentos e campanhas de
        marketing relacionadas ao seu trabalho astrológico.
      </p>
      <p>
        <strong>
          O consentimento para o recebimento de comunicações promocionais
          poderá ser revogado pelo usuário a qualquer momento.
        </strong>{" "}
        Para revogar seu consentimento ou solicitar a exclusão dos seus
        dados, entre em contato através do WhatsApp profissional disponível
        no site.
      </p>

      <h2>Maioridade e Capacidade</h2>
      <p>
        Este site destina-se exclusivamente a usuários com idade igual ou
        superior a 18 anos. Caso seja identificado o uso indevido por menores
        de 18 anos, a conta e os dados serão excluídos imediatamente, conforme
        as disposições legais aplicáveis.
      </p>

      <h2>Sigilo das Consultas</h2>
      <p>
        As consultas astrológicas são estritamente confidenciais e não
        poderão, sob hipótese alguma, ser gravadas por nenhuma das partes sem
        autorização prévia, mantendo-se o sigilo total sobre as informações
        abordadas durante o atendimento.
      </p>

      <h2>Compartilhamento de Dados com Terceiros</h2>
      <p>
        A compra de livros (físicos ou digitais) divulgados neste site é
        processada por plataformas externas especializadas, como Hotmart e
        Amazon. O processamento de pagamentos, emissão de notas fiscais e
        demais dados relativos a essas transações são tratados diretamente
        por essas plataformas, sob suas próprias políticas de privacidade.
      </p>

      <p>
        Para informações sobre o uso geral do site e condições de
        agendamento de consultas, consulte nossos{" "}
        <a href="/termos-de-uso">Termos de Uso</a>.
      </p>
    </LegalPageLayout>
  );
}
