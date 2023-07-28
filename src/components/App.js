import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { Home, Login, Signup, Settings } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

// function PrivateRoute({ children, ...rest }) {
//   const auth = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={() => {
//         if (auth.user) {
//           return children;
//         }

//         return <Navigate to="/login" />;
//       }}
//     />
//   );
// }

export const PrivateRoute = ({ children}) => {
  const auth = useAuth();
      
  if (auth.user ) {
    return children
  }
    
  return <Navigate to="/login" />
}

const Page404 = () => {
  return <h1>404 Not Found</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={[]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
