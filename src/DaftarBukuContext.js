import React, { useState, createContext } from "react";

export const DaftarBukuContext = createContext();

export const DaftarBukuProvider = props => {
  const [daftarBuku, setDaftarBuku] = useState({
    lists: null,
    selectedId: 0,
    statusForm: "create"
  });

  return (
    <DaftarBukuContext.Provider value={[daftarBuku, setDaftarBuku]}>
      {props.children}
    </DaftarBukuContext.Provider>
  );
};