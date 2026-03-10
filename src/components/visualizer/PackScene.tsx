'use client'

import { Canvas } from '@react-three/fiber'
import { Grid, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { BoxWireframe } from './BoxWireframe'
import { PackedItem } from './PackedItem'
import { SceneControls } from './SceneControls'
import type { PackResult } from '@/lib/packing/types'

interface Props {
  result: PackResult
}

function Scene({ result }: Props) {
  const { box, placedItems } = result

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} castShadow />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      <BoxWireframe box={box} />

      {placedItems.map(item => (
        <PackedItem
          key={item.itemId}
          placedItem={item}
          boxLength={box.length}
          boxWidth={box.width}
          boxHeight={box.height}
        />
      ))}

      <Grid
        args={[50, 50]}
        position={[0, -box.height / 2 - 0.01, 0]}
        cellColor="#e2e8f0"
        sectionColor="#cbd5e1"
        fadeDistance={50}
        infiniteGrid
      />

      <SceneControls boxLength={box.length} boxHeight={box.height} boxWidth={box.width} />
      <Environment preset="city" />
    </>
  )
}

export function PackScene({ result }: Props) {
  const maxDim = Math.max(result.box.length, result.box.width, result.box.height)
  const camDist = maxDim * 1.8

  return (
    <div className="w-full h-full bg-slate-50 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [camDist, camDist * 0.7, camDist], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene result={result} />
        </Suspense>
      </Canvas>
    </div>
  )
}
