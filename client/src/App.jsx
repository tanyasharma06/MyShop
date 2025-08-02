import './App.css'
import React, { Suspense, lazy } from 'react';
import AdminLayout from './components/admin-view/layout';
import AuthLayout from './components/auth/layout';
import ShoppingLayout from './components/shopping-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './pages/not-found';
import PaypalReturnPage from './pages/shopping-view/paypal-return';
import PaymentSuccessPage from './pages/shopping-view/payment-success';
import SearchProducts from './pages/shopping-view/search';
import ShoppingHeader from './components/shopping-view/header';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from 'sonner';

function App () {
    const {user , isAuthenticated, isLoading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(checkAuth());
    }, [dispatch])

    if(isLoading) return <Skeleton className="h-[600px] w-[800px] bg-black" />
  return (
<div className='flex flex-col overflow-hidden bg-white'>
 <Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path='/' element={<Navigate to="/auth/login" replace />} />
    <Route path='/auth' element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AuthLayout/>
    </CheckAuth>
    }>
      <Route path="login" element={<AuthLogin/>}/>
      <Route path="register" element={<AuthRegister/>}/>
    </Route>

    <Route path='/admin' element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <AdminLayout/>
      </CheckAuth>
    }>
      <Route path="dashboard" element={<AdminDashboard/>} />
      <Route path="products" element={<AdminProducts/>} />
      <Route path="orders" element={<AdminOrders/>} />
      <Route path="features" element={<AdminFeatures/>} />

    </Route>
    <Route path='/shop' element={
      <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <ShoppingLayout/>
      </CheckAuth>
    }> 
      <Route path="home" element={<ShoppingHome/>} />
      <Route path="listing" element={<ShoppingListing/>} />
      <Route path="checkout" element={<ShoppingCheckout/>} />
      <Route path="account" element={<ShoppingAccount/>} />
      <Route path="search" element={<SearchProducts />} />
      <Route path="paypal-return" element={<PaypalReturnPage />} />
      <Route path="payment-success" element={<PaymentSuccessPage />} />
    </Route>
    <Route path= '*' element ={<NotFound/>} />
    <Route path='/unauth-page' element={<UnauthPage/>} />
  </Routes>
     </Suspense>
  <Toaster />
</div>

   );
 }
 
 export default App ;
