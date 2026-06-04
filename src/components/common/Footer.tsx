import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

export function Footer() {
    return (
        <footer className="footer light-text">
            <div>
                <NavLink to="/" aria-label="Ir a la página de inicio" data-link="footer-logo-btn">
                    <img src={logo} alt="Logotipo de Vitamet en el pie de página" loading="lazy" decoding="async" />
                </NavLink>
            </div>

            <div>
                <NavLink to="/politica-privacidad" title="Ver el aviso de privacidad" data-link="footer-politica-link">
                    Aviso de privacidad
                </NavLink>
            </div>
        </footer>
    );
}
