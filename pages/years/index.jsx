import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Years = dynamic(() => import('../../modules/years/Years'), {
    loading: () => <PageLoader />,
});

const YearPage = () => (

    <SecurePage>
        <Years />
    </SecurePage>
)


export default YearPage;
