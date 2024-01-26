import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WorkflowBuilder from './pages/WorkflowBuilder';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:id" element={<WorkflowBuilder />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
