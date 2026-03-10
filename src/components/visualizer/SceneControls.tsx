'use client'

import { useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useRef } from 'react'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

interface Props {
  boxLength: number
  boxHeight: number
  boxWidth: number
}

export function SceneControls({ boxLength, boxHeight, boxWidth }: Props) {
  const controlsRef = useRef<OrbitControlsType>(null)
  const { camera } = useThree()

  function resetCamera() {
    const maxDim = Math.max(boxLength, boxWidth, boxHeight)
    const dist = maxDim * 1.8
    camera.position.set(dist, dist * 0.7, dist)
    camera.lookAt(0, 0, 0)
    controlsRef.current?.reset()
  }

  return (
    <>
      <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.08} />
      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <div className="absolute bottom-3 right-3" style={{ pointerEvents: 'all' }}>
          <button
            onClick={resetCamera}
            className="bg-white/80 hover:bg-white text-slate-600 text-xs px-2 py-1 rounded shadow border border-slate-200 backdrop-blur"
          >
            Reset Camera
          </button>
        </div>
      </Html>
    </>
  )
}
