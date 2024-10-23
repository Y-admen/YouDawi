import { createContext, useContext } from 'react';

// Create RoleContext to manage roles globally
const RoleContext = createContext();

export const RoleProvider = ({ role, children }) => (
  <RoleContext.Provider value={role}>{children}</RoleContext.Provider>
);

// Custom hook to use role context
export const useRole = () => useContext(RoleContext);



// import { RoleProvider } from './RoleContext';

// const App = () => {
//   const token = localStorage.getItem('doctorToken');
//   let decodedToken = null;
//   let role = null;

//   if (token) {
//     decodedToken = jwt_decode(token);
//     role = decodedToken.role;
//   }

//   return (
//     <RoleProvider role={role}>
//       <Routes>
//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/doctor" element={<DoctorPage />} />
//         {/* ... */}
//       </Routes>
//     </RoleProvider>
//   );
// };
