import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import UserContextProvider from './Context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartContextProvider } from './Context/CartContext';
import OrdersContextProvider from './Context/OrdersContext';
import WishlistContextProvider from './Context/WishlistContext';









const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient();

root.render(
    // <React.StrictMode>
        <WishlistContextProvider>
            <OrdersContextProvider>
                <CartContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <UserContextProvider>
                            <App />
                        </UserContextProvider>
                    </QueryClientProvider>
                </CartContextProvider>
            </OrdersContextProvider>
        </WishlistContextProvider>
    //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
