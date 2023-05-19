import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 3,
        label: 'ACCESO',
        isTitle: true
    },
    {
        id: 4,
        label: 'Usuarios',
        icon: 'ri-user-5-line',
        link: '/acceso/usuarios/listado'
    },
    {
        id: 1,
        label: 'GENERALES',
        isTitle: true
    },
    {
        id: 2,
        label: 'Departamentos',
        icon: 'ri-honour-line',
        link: '/'
    },
    {
        id: 5,
        label: 'CASOS LEGALES',
        isTitle: true
    },
    {
        id: 4,
        label: 'Casos',
        icon: 'ri-honour-line',
        link: '/'
    },
    {
        id: 5,
        label: 'Cargos',
        icon: 'ri-honour-line',
        link: 'casoslegales/cargos/listado'
    },

    
];
