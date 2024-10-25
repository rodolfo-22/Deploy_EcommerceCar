import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import 'swiper/swiper-bundle.css';


const EcommerceApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default EcommerceApp;
