import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useStore } from '../store/useStore';
import { Room } from './Room';

export function RoomCanvas() {
  const currentRoom = useStore((state) => state.currentRoom);
  console.log(currentRoom);
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden bg-gray-900">
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="apartment" />
        <OrbitControls />
        {currentRoom && <Room room={currentRoom} />}
      </Canvas>
    </div>
  );
}