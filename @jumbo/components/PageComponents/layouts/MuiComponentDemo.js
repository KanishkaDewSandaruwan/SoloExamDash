import React from 'react';
import ComponentsDemo from './ComponentsDemo';

const MuiComponentDemo = ({ pageTitle, menus, children }) => {
  const breadcrumbs = [
    { label: 'Dashboard', link: '/' },
    { label: pageTitle, isActive: true },
  ];
  return (
    <ComponentsDemo pageTitle={pageTitle} breadcrumbs={breadcrumbs} menus={menus}>
      {children}
    </ComponentsDemo>
  );
};
export default MuiComponentDemo;
