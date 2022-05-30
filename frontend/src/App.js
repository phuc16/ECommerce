import './App.css';
import Payment from './component/payment';
import PaymentComplete from './page/payment-complete';
import PaymentFail from './page/payment-fail';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />}></Route>
        <Route path="/complete" element={<PaymentComplete />}></Route>
        <Route path="/paymentfail" element={<PaymentFail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
