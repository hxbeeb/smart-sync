// // src/components/PrivateRoute.js
// import React from 'react';
// import { Route} from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const { user } = useAuth();

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 user ? <Component {...props} /> : <Redirect to="/login" />
//             }
//         />
//     );
// };

// export default PrivateRoute;
