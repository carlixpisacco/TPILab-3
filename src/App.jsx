import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import MainPage from './components/mainPage/MainPage';
import SellProduct from './components/sellProduct/SellProduct'
import ProductDetails from './components/productDetails/ProductDetails'
import NotFound from './components/notFound/NotFound'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
    },

    {
      path: "product/:id",
      element: <ProductDetails/>,
    },

    {
      path: "/addProduct",
      element: //(
        //<Protected>
          <SellProduct/>
      //</Protected>
    //),
    },

    
    //{
      //path: "/shopping",
      //element: (
        //<Protected>
        //<ShoppingCard />
      //</Protected>
    //),
    //},

    
    //{
      //path: "/login",
      //element: <Login />,
    //},

    //{
      //path: "/register",
      //element: <Register />,
    //},

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
      <div>
         {<RouterProvider router={router} />}
      </div>
  )
}

export default App

//    
//   