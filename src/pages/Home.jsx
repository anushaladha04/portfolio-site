import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber' 
import Loader from '../components/Loader'
import HomeInfo from '../components/HomeInfo'

import { Island } from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'

import ceilings from '../assets/ceilings.mp3'

const Home = () => {
  const audioRef = useRef(new Audio(ceilings));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentFocusPoint] = useState([0, 0, 0]);
  const [isPlayingMusic, setisPlayingMusic] = useState(false);

  useEffect(() => {
    if(isPlayingMusic) {
      audioRef.current.play();
    } 

    return () => {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if(window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43];
    }
    return { screenScale, screenPosition, rotation};
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if(window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  }
  
  const { screenScale, screenPosition, rotation } = adjustIslandForScreenSize();
  const [ planeScale, planePosition ] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      <Canvas 
        className={`w-full h-full bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{near: 0.1, far: 1000}}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight position={[10,1,1]} intensity={2} />
            <ambientLight intensity={0.5}/>
            <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

            <Bird />
            <Sky isRotating={isRotating}/>
            <Island 
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
              currentFocusPoint={currentFocusPoint}
              position={screenPosition}
              scale={screenScale}
              rotation={rotation}
            />
            <Plane 
              isRotating={isRotating}
              scale={planeScale}
              position={planePosition}
              rotation={[0, 20, 0]}
            />
          </Suspense>
      </Canvas>

      <div className="group absolute bottom-6 left-6 z-10 flex items-center">
        <span
          className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
          aria-hidden
        >
          AnushaTunes
        </span>
        <button
          type="button"
          onClick={() => setisPlayingMusic(!isPlayingMusic)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center"
          aria-label={isPlayingMusic ? 'Pause music' : 'Play music'}
        >
          {isPlayingMusic ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19h-6V5h6v14zM9 19V5H6v14h3z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          )}
        </button>
      </div>
    </section>
  )
}

export default Home