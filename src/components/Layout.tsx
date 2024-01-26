import { FC, ReactNode } from 'react';
import Header from './Header';
import ModalProvider from '../providers/ModalProvider';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-navy-700">
      <Header />
      {children}
      <ModalProvider />
    </div>
  );
};

export default Layout;
