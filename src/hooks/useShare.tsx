import type { Agente } from '../types/agente';

export function useShare(agente: Agente | null) {
    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const compartir = async () => {
        const url = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: agente?.nombre,
                    text: 'Tarjeta digital',
                    url,
                });
            } else {
                await navigator.clipboard.writeText(url);

                alert('Link copiado');
            }
        } catch (err) {
            console.error('Error al compartir', err);
        }
    };

    const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

    return {
        copyLink,
        compartir,
        canShare,
    };
}
