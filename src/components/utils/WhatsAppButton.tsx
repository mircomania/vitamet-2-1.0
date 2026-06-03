import type { ReactNode } from 'react';

type WhatsAppButtonProps = {
    phone: string;
    message: string;
    className?: string;
    children?: ReactNode;
    dataCta?: string;
};

export function WhatsAppButton({ phone, message, children, className, dataCta }: WhatsAppButtonProps) {
    const encoded = encodeURIComponent(message);

    const link = `https://wa.me/${phone}?text=${encoded}`;

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className={className} aria-label="Contactar por WhatsApp" data-cta={dataCta}>
            {children || 'WhatsApp'}
        </a>
    );
}

{
    /* <WhatsAppButton
    phone={agente.whatsapp}
    message={`Hola ${agente.nombre}, vi tu tarjeta digital y quiero información.`}
>
    WhatsApp
</WhatsAppButton> */
}
