// // ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useUserContext } from '../Context/UserContext';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { userRole, loading } = useUserContext();

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

//   if (!userRole) {
//     window.location.href = '/login';
//   }

//   if (userRole !== requiredRole) {
//     window.location.href = '/';
//   }

//   return children;
// };

// export default ProtectedRoute;
