import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(undefined);
  console.log("")
  useEffect(() => {
    function handleWidth() {
      setWindowWidth(window.innerWidth);
    }
    
    window.addEventListener("resize", handleWidth);
    
    handleWidth();
    
    return () => window.removeEventListener("resize", handleWidth);
  }, []);

  return windowWidth;
}

export default useWindowSize;
