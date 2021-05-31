import React, { useState } from 'react';

const ModalContext = React.createContext();

function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);

  const contextValue = {
    showModal,
    setShowModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
