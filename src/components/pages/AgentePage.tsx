import styles from '../../styles/modules/agentePage.module.css';

import imgLlamada from '../../assets/images/llamada.webp';
import imgEmail from '../../assets/images/correo.webp';
import imgCheck from '../../assets/images/check.webp';

import { Spinner } from '../../assets/icons/Spinner';
import { IconoCompartir } from '../../assets/icons/Compartir';
import { IconoCopiar } from '../../assets/icons/Copiar';
import { IconoWhatsApp } from '../../assets/icons/Whatsapp';

import { useParams } from 'react-router-dom';

import { TitleSEO } from '../../utils/TitleSEO';
import { ErrorCarga } from '../utils/ErrorCarga';
import { WhatsAppButton } from '../utils/WhatsAppButton';
import { DownloadContact } from '../utils/DownloadContact';
import { PalomasAgentes } from '../utils/PalomasAgente';

import { useAgente } from '../../hooks/useAgente';
import { useShare } from '../../hooks/useShare';

const AgentePage = () => {
    const { slug } = useParams();

    const { agente, error } = useAgente(slug);
    const { copyLink, compartir, canShare } = useShare(agente);

    if (error) {
        return (
            <div className="cargando">
                <ErrorCarga />
            </div>
        );
    }

    if (!agente) {
        return (
            <div className="cargando">
                <Spinner />
            </div>
        );
    }

    return (
        <main className="fondo-1">
            <TitleSEO
                title={agente.nombre}
                description="Los mejores agentes del mundo"
                canonical={`https://proconsultores.com.mx/agentes/${agente.path}`}
            />

            <section className={styles.sectionContainer}>
                <div className={styles.cardContainer}>
                    <button className={`light-text ${styles.botonShared}`} onClick={canShare ? compartir : copyLink} data-cta="agente-shared-btn">
                        {canShare ? <IconoCompartir className={styles.iconoShared} /> : <IconoCopiar className={styles.iconoShared} />}
                    </button>

                    <div className={styles.agenteContainer}>
                        <h1 className="bold-text">{agente.nombre}</h1>

                        <h2 className="light-text">{agente.cargo}</h2>
                    </div>

                    <img src={agente.foto} loading="lazy" alt={`Foto de ${agente.nombre}`} />

                    <div className={styles.infoContainer}>
                        <DownloadContact
                            className={`${styles.vcard} light-text`}
                            agente={agente}
                            filename={agente.path}
                            dataCta="agente-guardar-btn"
                        />

                        <div className={`light-text ${styles.experienciaContainer}`}>
                            <div className={styles.expDetail}>
                                <h3>+{agente.exp}</h3>
                                <p>AÑOS EXP</p>
                            </div>

                            <div className={styles.expDetail}>
                                <h3>+{agente.clientes}</h3>
                                <p>CLIENTES</p>
                            </div>

                            <div className={styles.expDetail}>
                                <h3>{agente.status}</h3>
                                <p>STATUS</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.canalesContainer}>
                    <h3 className="light-text">Canales de Atención</h3>

                    <div className={`light-text ${styles.contactoContainer}`}>
                        <WhatsAppButton
                            className={styles.contactoDetail}
                            phone={agente.whatsapp}
                            message={`Hola ${agente.nombre}, vi tu tarjeta digital y quiero información.`}
                            dataCta="agente-whatsapp-btn"
                        >
                            <IconoWhatsApp className={styles.botonWhatsapp} />

                            <p>WhatsApp</p>
                        </WhatsAppButton>

                        <a href={`tel:${agente.telefono}`} className={styles.contactoDetail} data-cta="agente-llamar-btn">
                            <img src={imgLlamada} alt="icono WhatsApp" />

                            <p>Llamar Ahora</p>
                        </a>

                        <a href={`mailto:${agente.correo}`} className={styles.contactoDetail} data-cta="agente-correo-btn">
                            <img src={imgEmail} alt="icono WhatsApp" />

                            <p>Enviar correo</p>
                        </a>
                    </div>
                </div>

                <div className={` light-text ${styles.perfilContainer}`}>
                    <h3>Perfil Profesional</h3>

                    <p>
                        Especialista en planeación patrimonial enfocada en el aprovechamiento estratégico de créditos Infonavit. Mi experiencia se
                        centra en la lectura, análisis e interpretación de los programas, brindando asesoría clara, transparente y personalizada para
                        que cada cliente tome decisiones financieras inteligentes y seguras.
                    </p>

                    <p>
                        Acompaño a cada persona durante todo el proceso, desde la evaluación de su perfil hasta la correcta aplicación del crédito,
                        asegurando un trámite ágil y enfocado en maximizar su beneficio y fortalecer su patrimonio.
                    </p>

                    <div className={` light-text ${styles.palomas}`}>
                        {PalomasAgentes.map((paloma) => (
                            <div key={paloma.id} className={styles.paloma}>
                                <img src={imgCheck} alt={paloma.texto} />

                                <p>{paloma.texto}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AgentePage;
