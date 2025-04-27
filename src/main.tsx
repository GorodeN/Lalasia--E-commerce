import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from 'config/routesConfig';
import './config/configureMobX';

const router = createHashRouter(routesConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
