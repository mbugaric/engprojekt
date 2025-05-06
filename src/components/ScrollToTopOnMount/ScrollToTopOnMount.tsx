import { useEffect } from "react";

const ScrollToTopOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  return null;
};

export default ScrollToTopOnMount;