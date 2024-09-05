import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';
import NoPage from "./pages/NoPage.tsx";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage.tsx";


function App() {


    return (

                <Router>
                        <Routes>
                            <Route path="/" element={<HomeLayout title="Home"/>}>
                                <Route index element={<HomePage/>}/>

                            </Route>
                            <Route path="/settings" element={<HomeLayout title="Settings"/>}>
                                <Route index element={<SettingsPage />}/>

                            </Route>

                            <Route path="*" element={<NoPage />} />
                        </Routes>
                </Router>
    );
}

export default App;
