// // src/context/AuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// // Create an Auth Context
// const AuthContext = createContext();

// // Provider component
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const login = (userData) => {
//         setUser(userData);
//     };

//     const logout = () => {
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the Auth context
// export const useAuth = () => {
//     return useContext(AuthContext);
// };
