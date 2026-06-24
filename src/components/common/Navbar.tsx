import logo from '../../assets/images/logo.svg';

import { useMediaQuery } from '../../hooks/useMediaQuery';

import { BurgerMenu } from './BurgerMenu';
import { navbarMenu } from '../utils/navbarMenu';
import { NavItems } from '../utils/NavItems';
import { SmartLink } from '../../utils/SmartLink';

export const Navbar = () => {
    const isMobile = useMediaQuery('(max-width: 991px)');

    return (
        <header role="banner">
            <nav className="navbar" aria-label="Barra de navegación principal">
                <SmartLink to="/" aria-label="Ir a inicio" dataLink="navbar-logo-btn">
                    <img src={logo} alt="Logotipo de Vitamet" className="logo-navbar" />
                </SmartLink>

                {!isMobile && (
                    <>
                        <ul className="navbar-menu">
                            {navbarMenu.map((item) => (
                                <li key={item.id}>
                                    <NavItems item={item} />
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </nav>

            {isMobile && <BurgerMenu />}
        </header>
    );
};
