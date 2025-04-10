// components/ProductViewer/ProductViewer.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

function Model({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
}

export default function ProductViewer({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <Model modelUrl={modelUrl} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
