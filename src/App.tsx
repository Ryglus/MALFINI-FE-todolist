import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';
import NoPage from "./pages/NoPage.tsx";
import HomePage from "./pages/HomePage";


function App() {


    return (

                <Router>
                        <Routes>
                            <Route path="/" element={<HomeLayout/>}>
                                <Route index element={<HomePage/>}/>
                            </Route>
                            <Route path="*" element={<NoPage />} />
                        </Routes>
                </Router>
    );
}

export default App;
