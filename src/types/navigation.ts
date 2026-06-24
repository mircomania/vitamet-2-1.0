export type NavItemType = 'route' | 'anchor';

export interface NavItem {
    id: string;
    type: NavItemType;
    to: string;
    label: string;
    title?: string;
    dataLink?: string;
    dataCta?: string;
}
