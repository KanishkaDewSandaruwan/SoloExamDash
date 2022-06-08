import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Subject = dynamic(() => import('../../modules/subject/Subject'), {
  loading: () => <PageLoader />,
});

const SubjectPage = () => (
  <SecurePage>
    <Subject />
  </SecurePage>
);

export default SubjectPage;