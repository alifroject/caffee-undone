import React, { ReactNode } from 'react';
import NavbarHome from '../Components/ComponentTS/NavbarHome';
import "./Css/Layout.css"
import { wrap } from 'module';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <NavbarHome />
      <div className="container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, backgroundColor: 'white', width: "calc(100vw - 16px)", overflowX: "hidden", position: 'relative'}}>
          <main>
            {children}
          </main>
        </div>
        <footer className="footer" style={{width: "calc(100vw - 16px"}}>
          <div className="item item1">Item 1</div>
          <div className="item item2">Item 2</div>
          <div className="item item3">Item 3</div>
          <div className="item item4">Item 4</div>
        </footer>
      </div>

      

    </React.Fragment>
  );
}

export default Layout;
