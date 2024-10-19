import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import axios from './api/axios';
import Acceuil from './components/pages/acceuil';
import Menu from './components/pages/menu';
import Reservation from './components/pages/reservation';
import Contact from './components/pages/contact';
import Cart from './components/pages/cart';
import { CartProvider } from './components/pages/cartContext';
import Inscription from './components/pages/inscription';
import List_utilisateurs from './components/pages/list_utilisateurs';
import List_reservations from './components/pages/list_reservations';
import Login from './components/pages/Login';
import { AuthProvider } from './components/pages/authContext';
import ProtectedRoute from './components/pages/ProtectedRoute';
import PageConfirmation from './components/pages/PageConfirmation';
import List_commandes from './components/pages/list_commandes';

function App() {
  useEffect(() => {
        axios.get('/sanctum/csrf-cookie').then(response => {
            console.log('Cookie CSRF récupéré avec succès');
        }).catch(error => {
            console.error('Erreur lors de la récupération du cookie CSRF', error);
        });
    }, []);
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path='/' element={<Acceuil />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/page_confirmation' element={<PageConfirmation />} />
              <Route path='/list_users' element={<List_utilisateurs />} />
              <Route path='/list_reservations' element={<List_reservations />} />
              <Route path='/list_commandes' element={<List_commandes />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
