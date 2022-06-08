import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';
import { useRouter } from 'next/router';

const ParallelCorpus = dynamic(() => import('../../modules/parallalcorpus/ParallalCorpus'), {
  loading: () => <PageLoader />,
});

const PPage = () => {
  const router = useRouter();
  const parallelCorpusId = router.query.parallelCorpusId;

  return (
    <SecurePage>
      <ParallelCorpus id={parallelCorpusId} />
    </SecurePage>
  );
}

export default PPage;