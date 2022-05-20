import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Order from './components/order.component';
import CreateOrder from './components/create.component';
import EditOrder from './components/edit.component';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="header">
                    <p>Tech Hub Stationery Store</p>
                </header>
                <div>
                    <Routes>
                        <Route path="/product" element={<Order />} />
                        <Route
                            path="/product/create"
                            element={<CreateOrder />}
                        />
                        <Route
                            path="/product/edit/:id"
                            element={<EditOrder />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
