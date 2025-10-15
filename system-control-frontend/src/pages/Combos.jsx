import React, { useState } from "react";
import VerVentasCombos from "../components/combos/VerVentasCombos";
import SidebarNav from '../components/Nabvar';

const CombosPage = () => {
  const [openSidebar, setOpenSidebar] = useState(true);

  const toggleSidebar = () => setOpenSidebar(prev => !prev);

  return (
    <div style={{ display: 'flex' }}>
      <SidebarNav open={openSidebar} toggleOpen={toggleSidebar} />
      <div style={{ flexGrow: 1, padding: 20 }}>
        <VerVentasCombos />
      </div>
    </div>
  );
};

export default CombosPage;
