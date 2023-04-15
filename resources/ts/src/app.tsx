import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import FrontendLayout from './components/frontend/navigation/layout';

// Frontend routes
import Home from './pages'

export default function App() {
    return <div className='App'>
        <Routes>
            <Route path="/" element={<FrontendLayout><Outlet /></FrontendLayout>}>
                <Route path="/" index element={<Home />} />
            </Route>
        </Routes>
    </div>;
}
