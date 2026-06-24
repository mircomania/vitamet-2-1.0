import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MouseEvent } from 'react';

import type { NavItem } from '../types/navigation';

type NavigationEvent = MouseEvent<HTMLAnchorElement> | null;

export const useNavActions = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const scrollToTop = useCallback((): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    const scrollToAnchor = useCallback((hash: string): void => {
        const el = document.querySelector(hash);

        if (!el) return;

        const offset = 50;

        const y = el.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: y,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            requestAnimationFrame(() => {
                scrollToAnchor(location.hash);
            });
        }
    }, [location.pathname, location.hash, scrollToAnchor]);

    const handleNavigation = useCallback(
        (e: NavigationEvent, item: NavItem): void => {
            e?.preventDefault();

            if (item.to === '/') {
                if (location.pathname === '/') {
                    scrollToTop();
                } else {
                    navigate('/');
                }

                return;
            }

            if (item.type === 'anchor') {
                if (location.pathname === '/') {
                    scrollToAnchor(item.to);

                    window.history.replaceState(null, '', item.to);
                } else {
                    navigate(`/${item.to}`);
                }

                return;
            }

            navigate(item.to);
        },
        [location.pathname, navigate, scrollToTop, scrollToAnchor],
    );

    const isAnchorActive = (item: NavItem): boolean => item.type === 'anchor' && location.pathname === '/' && location.hash === item.to;

    return {
        handleNavigation,
        isAnchorActive,
    };
};
