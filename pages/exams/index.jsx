import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Exam = dynamic(() => import('../../modules/exam/Exam'), {
  loading: () => <PageLoader />,
});

const ExamPage = () => (
  <SecurePage>
    <Exam />
  </SecurePage>
);

export default ExamPage;