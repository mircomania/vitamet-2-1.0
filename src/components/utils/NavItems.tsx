import type { MouseEvent } from 'react';

import { useNavActions } from '../../hooks/useNavActions';

import { SmartLink } from '../../utils/SmartLink';

import type { NavItem } from '../../types/navigation';

interface NavItemsProps {
    item: NavItem;
    dataLink?: string;
    dataCta?: string;
    onAfterNavigate?: () => void;
}

export const NavItems = ({ item, onAfterNavigate }: NavItemsProps) => {
    const { handleNavigation, isAnchorActive } = useNavActions();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        handleNavigation(e, item);
        onAfterNavigate?.();
    };

    const commonProps = {
        title: item.title,
        ...(item.dataLink && { dataLink: item.dataLink }),
        ...(item.dataCta && { dataCta: item.dataCta }),
        onClick: handleClick,
    };

    if (item.type === 'anchor') {
        return (
            <a
                href={item.to}
                /* activar solo si todas las rutas son anchors */
                /* className={isAnchorActive(item) ? 'active' : ''} */
                aria-current={isAnchorActive(item) ? 'page' : undefined}
                {...commonProps}
            >
                {item.label}
            </a>
        );
    }

    return (
        <SmartLink to={item.to} {...commonProps}>
            {item.label}
        </SmartLink>
    );
};
