'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useLayoutEffect, useRef } from 'react';
import { Group, Box3, Vector3 } from 'three';

function Model({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  const ref = useRef<Group>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Compute bounding box to center model
    const box = new Box3().setFromObject(ref.current);
    const center = new Vector3();
    box.getCenter(center);
    ref.current.position.sub(center); // Move model to center
  }, [scene]);

  return <primitive ref={ref} object={scene} />;
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
