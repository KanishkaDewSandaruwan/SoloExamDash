import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Languages = dynamic(() => import('../../modules/language/Language'), {
  loading: () => <PageLoader />,
});

const LanguagesPage = () => (
  <SecurePage>
    <Languages />
  </SecurePage>
);

export default LanguagesPage;