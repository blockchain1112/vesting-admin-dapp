import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import VestingPage from "./pages/VestingPage";
import DashboardPage from "./pages/DashboardPage";
import SwapPage from "./pages/SwapPage";
import StakingPage from "./pages/StakingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" exact element={<VestingPage />} />
          <Route path="/dashboard" exact element={<DashboardPage />} />
          <Route path="/swap" exact element={<SwapPage />} />
          <Route path="/staking" exact element={<StakingPage />} />
          <Route path="/vesting" exact element={<VestingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
