import { FC } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from 'components/pages/Home';
import { Sub } from 'components/pages/Sub';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sub/:id" element={<Sub />} />
      </Routes>
    </BrowserRouter>
  );
};
