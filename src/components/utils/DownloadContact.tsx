import { useMemo, useEffect, type ReactNode } from 'react';

import imgAgregar from '../../assets/images/agente/agregar.webp';

import type { agente } from '../../types/agente';

type DownloadContactProps = {
    agente: agente;
    filename?: string;
    className?: string;
    children?: ReactNode;
    dataCta?: string;
};

export function DownloadContact({ agente, filename, className, children, dataCta }: DownloadContactProps) {
    const { nombre, whatsapp, cargo, correo } = agente;

    const vcard = useMemo(
        () => `BEGIN:VCARD
VERSION:3.0
N:;${nombre};;;
FN:${nombre}
TITLE:${cargo}
TEL;TYPE=CELL:${whatsapp}
EMAIL;TYPE=INTERNET:${correo}
END:VCARD`,
        [nombre, cargo, whatsapp, correo],
    );

    const url = useMemo(() => {
        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
        return URL.createObjectURL(blob);
    }, [vcard]);

    useEffect(() => {
        return () => URL.revokeObjectURL(url);
    }, [url]);

    return (
        <a className={className} href={url} download={`${filename || nombre}.vcf`} data-cta={dataCta}>
            <img src={imgAgregar} alt="Guardar contacto" />

            {children || 'Guardar contacto'}
        </a>
    );
}
