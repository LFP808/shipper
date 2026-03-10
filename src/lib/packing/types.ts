export interface Item {
  id: string
  name: string
  length: number  // inches
  width: number
  height: number
  weightLb: number
}

export interface Box {
  id: string
  carrier: string
  name: string
  length: number  // inches
  width: number
  height: number
  maxWeightLb: number
}

export interface PlacedItem {
  itemId: string
  itemName: string
  x: number       // origin corner, inches from box corner
  y: number
  z: number
  length: number  // final orientation dimensions
  width: number
  height: number
  color: string   // hex color for visualization
}

export interface PackResult {
  box: Box
  placedItems: PlacedItem[]
  unpackedItemIds: string[]
  utilizationPct: number
  totalWeightLb: number
}
