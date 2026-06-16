import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']

function CargoBox({ position, dimension, index }) {
  const [x, y, z] = position.map(Number)
  const [w, h, d] = dimension.map(Number)

  return (
    <mesh position={[x + w/2, y + h/2, z + d/2]}>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={COLORS[index % COLORS.length]} transparent opacity={0.8} />
    </mesh>
  )
}

function TruckOutline({ truck }) {
  return (
    <mesh position={[truck.width/2, truck.height/2, truck.depth/2]}>
      <boxGeometry args={[truck.width, truck.height, truck.depth]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  )
}

export default function TruckViewer({ packedItems, truck }) {
  return (
    <Canvas camera={{ position: [30, 20, 30], fov: 60 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls />
      <TruckOutline truck={truck} />
      {packedItems.map((item, i) => (
        <CargoBox
          key={i}
          position={item.position}
          dimension={item.dimension}
          index={i}
        />
      ))}
    </Canvas>
  )
}