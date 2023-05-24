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
        id: 6,
        label: 'Cargos',
        icon: 'ri-honour-line',
        link: '/general/cargo/listado'
    },
    {
        id: 7,
        label: 'Estados Civiles',
        icon: 'ri-honour-line',
        link: '/general/estadocivil/listado'
    },
    {
        id: 8,
        label: 'Municipios',
        icon: 'ri-honour-line',
        link: '/general/municipio/listado'
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
    },{
        id: 5,
        label: 'Tipos de Evidencia',
        icon: 'ri-honour-line',
        link: 'casoslegales/tiposdeevidencia/listado'
    }
];
