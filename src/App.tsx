import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Home } from './components/pages/Home';

import { Cargando } from './components/utils/Cargando';
import { ScrollToTop } from './utils/ScrollToTop';

function App() {
    return (
        <>
            <ScrollToTop />

            <Navbar />

            <Suspense
                fallback={
                    <main className="cargando">
                        <Cargando />
                    </main>
                }
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Suspense>

            <Footer />
        </>
    );
}

export default App;
