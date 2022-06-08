import SignInPage from './signin';
import { useAuth } from '../authentication';
// import CryptoDashboard from './dashboard/crypto';
import ExamPage from './exams';

const HomePage = () => {
  const { authUser } = useAuth();
  return authUser ? <ExamPage /> : <SignInPage />;
};

export default HomePage;
