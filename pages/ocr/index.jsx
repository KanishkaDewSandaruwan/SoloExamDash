import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const OCR = dynamic(() => import('../../modules/ocr/OCR'), {
  loading: () => <PageLoader />,
});

const OCRPage = () => (
  <SecurePage>
    <OCR />
  </SecurePage>
);

export default OCRPage;