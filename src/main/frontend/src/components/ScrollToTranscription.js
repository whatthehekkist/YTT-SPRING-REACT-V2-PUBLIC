import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTranscription() {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.onload = () => {
      const element = document.getElementById("transcription");
      window.scrollTo(0, element.offsetTop);
    // }    
  }, [pathname]);

  return null;
}
