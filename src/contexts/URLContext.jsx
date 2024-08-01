import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const URLContext = createContext();

const URLContextProvider = ({ children }) => {
  // const [_URL, setURL] = useState("http://localhost:3000");
  const [_URL, setURL] = useState(
    "https://chattingappbackend-zkbx.onrender.com"
  );

  const URLContextValue = useMemo(() => ({ _URL, setURL }), [_URL, setURL]);

  return (
    <URLContext.Provider value={URLContextValue}>
      {children}
    </URLContext.Provider>
  );
};

export const useURL = () => {
  return useContext(URLContext);
};

export default URLContextProvider;
