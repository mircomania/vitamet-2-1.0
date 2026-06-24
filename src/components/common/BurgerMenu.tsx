import { BurgerIcon } from '../../assets/icons/BurgerIcon';
import logo from '../../assets/images/logo.svg';

import { navbarMenu } from '../utils/navbarMenu';
import { NavItems } from '../utils/NavItems';
import { useBurgerMenu } from '../../hooks/useBurgerMenu';

export const BurgerMenu = () => {
    const { isOpen, toggleMenu, closeMenu, menuRef } = useBurgerMenu();

    return (
        <nav aria-label="Menu de navegación móvil" ref={menuRef}>
            <button
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={toggleMenu}
                className={`burger-menu-container ${isOpen ? 'open' : ''}`}
            >
                <BurgerIcon className="burger-menu-icon" aria-label="Abrir menú de navegación" />
            </button>

            <div id="mobile-menu" className={`mobile-nav-menu ${isOpen ? 'open' : ''}`}>
                <ul>
                    {navbarMenu.map((item) => (
                        <li key={item.id}>
                            <NavItems item={item} onAfterNavigate={closeMenu} />
                        </li>
                    ))}
                </ul>

                <img className="logo-burger" src={logo} alt="Logotipo de Doctora Stefany Quintero Ortodoncia" loading="lazy" decoding="async" />
            </div>
        </nav>
    );
};
