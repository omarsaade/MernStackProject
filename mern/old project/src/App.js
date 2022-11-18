import React from 'react';
import { Route, Routes, Navigate, } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';


const App = () => {
  return <>
    <MainNavigation />
    <main>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </>;
}

export default App;