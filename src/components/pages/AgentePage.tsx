import styles from '../../styles/modules/agentePage.module.css';

import imgLlamada from '../../assets/images/llamada.webp';
import imgEmail from '../../assets/images/correo.webp';

import { Spinner } from '../../assets/icons/Spinner';
import { IconoCompartir } from '../../assets/icons/Compartir';
import { IconoCopiar } from '../../assets/icons/Copiar';
import { IconoWhatsApp } from '../../assets/icons/Whatsapp';
import { IconoCheck } from '../../assets/icons/Check';

import { useParams } from 'react-router-dom';

import { TitleSEO } from '../../utils/TitleSEO';
import { ErrorCarga } from '../utils/ErrorCarga';
import { WhatsAppButton } from '../utils/WhatsAppButton';
import { DownloadContact } from '../utils/DownloadContact';
import { PalomasAgentes } from '../utils/PalomasAgente';

import { useAgente } from '../../hooks/useAgente';
import { useShare } from '../../hooks/useShare';

function AgentePage() {
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
        <main className={styles.fondo}>
            <TitleSEO
                title={`${agente.nombre} | Vitamet`}
                description="Los mejores agentes del mundo"
                canonical={`https://vitamet.com.mx/agentes/${agente.path}`}
            />

            <section className={styles.sectionContainer}>
                <div className={styles.cardContainer}>
                    <button className={`light-text ${styles.botonShared}`} onClick={canShare ? compartir : copyLink} data-cta="agente-shared-btn">
                        {canShare ? <IconoCompartir className={styles.iconoShared} /> : <IconoCopiar className={styles.iconoShared} />}
                    </button>

                    <div className={styles.agenteContainer}>
                        <div>
                            <h2 className="bold-text">{agente.cargo}</h2>
                        </div>

                        <h1 className="bold-text">{agente.nombre}</h1>
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
                                <p>EXPERIENCIA</p>
                                <h3>+{agente.exp} Años</h3>
                            </div>

                            <div className={styles.expDetail}>
                                <p>CLIENTES</p>
                                <h3>+{agente.clientes}</h3>
                            </div>

                            <div className={styles.expDetail}>
                                <p>ESTATUS</p>
                                <h3>{agente.status}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.canalesContainer}>
                    <h3 className="light-text">CANALES DE ATENCIÓN</h3>

                    <div className={`light-text ${styles.contactoContainer}`}>
                        <a href={`tel:${agente.telefono}`} className={styles.contactoDetail} data-cta="agente-llamar-btn">
                            <img src={imgLlamada} alt="icono WhatsApp" />

                            <div>
                                <p>Llamar Ahora</p>
                                <h4>Llamar</h4>
                            </div>
                        </a>

                        <WhatsAppButton
                            className={styles.contactoDetail}
                            phone={agente.whatsapp}
                            message={`Hola ${agente.nombre}, vi tu tarjeta digital y quiero información.`}
                            dataCta="agente-whatsapp-btn"
                        >
                            <IconoWhatsApp className={styles.botonWhatsapp} />

                            <div>
                                <p>Mensaje directo</p>
                                <h4>WhatsApp</h4>
                            </div>
                        </WhatsAppButton>

                        <a href={`mailto:${agente.correo}`} className={styles.contactoDetail} data-cta="agente-correo-btn">
                            <img src={imgEmail} alt="icono WhatsApp" />

                            <div>
                                <p>Enviar correo</p>
                                <h4>Email</h4>
                            </div>
                        </a>
                    </div>
                </div>

                <div className={` light-text ${styles.perfilContainer}`}>
                    <h3>Perfil Profesional</h3>

                    <p>
                        Especialista en la planeación financiera y protección del patrimonio a través de seguros de vida y gastos médicos mayores. Mi
                        enfoque está en analizar cada situación de forma personalizada para ofrecer soluciones que brinden seguridad, estabilidad y
                        respaldo ante cualquier imprevisto.
                    </p>

                    <p>
                        Acompaño a cada cliente en la elección del plan adecuado, asegurando claridad en cada detalle y construyendo estrategias que
                        protejan su futuro y el de su familia.
                    </p>

                    <div className={` light-text ${styles.palomas}`}>
                        {PalomasAgentes.map((paloma) => (
                            <div key={paloma.id} className={styles.paloma}>
                                <IconoCheck className={styles.check} />

                                <p>{paloma.texto}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AgentePage;
