import { useParallax } from "react-scroll-parallax";

const Second: React.FC = () => {
  const parallax = useParallax<HTMLDivElement>({ speed: 10 });

  return (
    <div ref={parallax.ref} className="w-full h-screen bg-red-300">
      <h1>Next page</h1>
    </div>
  )
}

export default Second;
