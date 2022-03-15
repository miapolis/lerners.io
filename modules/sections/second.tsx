import { useParallax } from "react-scroll-parallax";

const Second: React.FC = () => {
  const parallax = useParallax<HTMLDivElement>({});

  return <div ref={parallax.ref} className="w-full h-screen bg-gray-900"></div>;
};

export default Second;
