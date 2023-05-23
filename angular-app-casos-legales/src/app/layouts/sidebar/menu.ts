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
        icon: ' ri-group-line',
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
        link: '/general/departamento/listado'
    },
    {
        id: 5,
        label: 'CASOS LEGALES',
        isTitle: true
    },
    {
        id: 4,
        label: 'Tipos de Casos',
        icon: 'ri-honour-line',
        link: 'casoslegales/tiposdecaso/listado'
    },
    {
        id: 4,
        label: 'Empleados',
        icon: 'ri-honour-line',
        link: 'casoslegales/empleado/listado'
    }
];
