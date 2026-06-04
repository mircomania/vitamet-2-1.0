import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

export function Navbar() {
    return (
        <header>
            <nav className="navbar" aria-label="Menú de navegación principal">
                <NavLink to="/" aria-label="Ir a la página principal" data-link="navbar-logo-btn">
                    <img src={logo} alt="Logotipo de Vitamet en la barra de navegación" className="logo-navbar" />
                </NavLink>
            </nav>
        </header>
    );
}
