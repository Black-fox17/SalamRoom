import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

export default function Room3D() {
  const room = useLoader(PLYLoader, "/room.ply");

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <Points>
        <primitive object={room} />
        <PointMaterial size={0.01} />
      </Points>
    </Canvas>
  );
}
