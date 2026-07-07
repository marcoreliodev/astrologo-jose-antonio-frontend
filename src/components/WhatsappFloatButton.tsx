import { EXTERNAL_LINKS } from "../lib/external-links";

export function WhatsappFloatButton() {
  return (
    <a
      href={EXTERNAL_LINKS.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Marcar consulta no WhatsApp"
      title="Marcar consulta no WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-transform duration-200 hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7"
    >
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-60"
        style={{ animation: "whatsapp-ping 2.4s cubic-bezier(0,0,0.2,1) infinite" }}
        aria-hidden
      />
      <WhatsappGlyph className="relative h-7 w-7 text-white" />
    </a>
  );
}

function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.94.56 3.75 1.53 5.3L2 22l4.94-1.6a9.8 9.8 0 0 0 5.1 1.4h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.07h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1 1 1.02-3.02-.2-.31a8.16 8.16 0 0 1-1.26-4.5c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.4a8.14 8.14 0 0 1 2.4 5.8c0 4.53-3.69 8.16-8.18 8.16zm4.48-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.33-.04-.46-.08-.12-.5-1.2-.69-1.65-.18-.43-.37-.37-.5-.38-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.29-.21.23-.81.79-.81 1.92 0 1.13.83 2.23.94 2.38.12.16 1.62 2.48 3.96 3.38 2.34.9 2.34.6 2.76.56.43-.04 1.39-.57 1.59-1.12.19-.55.19-1.02.13-1.12-.05-.1-.23-.16-.48-.28z" />
    </svg>
  );
}
