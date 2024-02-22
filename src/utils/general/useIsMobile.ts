import { useEffect, useState } from "react";

export const useIsMobile = () => {
  let [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 600);
  }, []);

  return { isMobile };
};
