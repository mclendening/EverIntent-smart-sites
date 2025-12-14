// App.tsx - Root component for vite-react-ssg
// Providers and layout are handled in main.tsx via RootLayout

import { Outlet } from 'react-router-dom';

const App = () => {
  return <Outlet />;
};

export default App;
