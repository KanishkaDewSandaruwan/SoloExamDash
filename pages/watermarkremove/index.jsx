import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const WaterMark = dynamic(() => import('../../modules/waterMark/WaterMark'), {
  loading: () => <PageLoader />,
});

const WaterMarkPage = () => (
  <SecurePage>
    <WaterMark />
  </SecurePage>
);

export default WaterMarkPage;
