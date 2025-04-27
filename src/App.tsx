import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from 'components/Header';
import 'styles/styles.css';
import styles from './App.module.scss';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.app__main}>
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar className={styles.app__toast}/>
    </div>
  );
}

export default App;
