import IntlMessages from '../../../utils/IntlMessages';
import {
  AccountCircle,
  ArrowForward,
  Category,
  Chat,
  CheckCircle,
  CloudUpload,
  Colorize,
  ContactMail,
  Contacts,
  Domain,
  Dashboard,
  DonutSmall,
  DragIndicator,
  Email,
  Edit,
  Event,
  Web,
  Group,
  ImportContacts,
  InsertChart,
  LibraryBooks,
  FileCopy,
  Language,
  LocalGroceryStore,
  LockOutlined,
  Map,
  MonetizationOn,
  NotificationImportant,
  Notifications,
  Pages,
  BorderClear,
  WbCloudy,
  Layers,
  Compare,
  Settings,
  People,
  ShowChart,
  Timeline,
  Image,
  Build,
  SettingsOverscan,
  VpnKey,
  EditSharp,
  Widgets,
} from '@material-ui/icons';
import React from 'react';

const dashboardsMenus = [
  {
    name: <IntlMessages id={'pages.subject'} />,
    type: 'item',
    icon: <Layers />,
    link: '/subject',
  },
  {
    name: <IntlMessages id={'pages.years'} />,
    type: 'item',
    icon: <Event />,
    link: '/years',
  },
  {
    name: <IntlMessages id={'pages.languages'} />,
    type: 'item',
    icon: <Language />,
    link: '/languages',
  },
  {
    name: <IntlMessages id={'pages.exam'} />,
    type: 'item',
    icon: <LibraryBooks />,
    link: '/exams',
  },
  {
    name: <IntlMessages id={'pages.watermarkremove'} />,
    type: 'item',
    icon: <Image />,
    link: '/watermarkremove',
  },
  {
    name: <IntlMessages id={'pages.ocr'} />,
    type: 'item',
    icon: <WbCloudy />,
    link: '/ocr',
  },
];


export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.dashboards'} />,
    type: 'section',
    children: dashboardsMenus,
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.dashboards'} />,
    type: 'collapse',
    children: dashboardsMenus,
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.dashboards'} />,
    type: 'collapse',
    children: dashboardsMenus,
  },
];
