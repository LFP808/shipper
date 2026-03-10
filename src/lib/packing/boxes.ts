import type { Box } from './types'

export const STANDARD_BOXES: Box[] = [
  // Generic small boxes
  { id: 'generic-6x6x4',    carrier: 'Generic', name: '6×6×4',    length: 6,    width: 6,    height: 4,   maxWeightLb: 50 },
  { id: 'generic-6x6x6',    carrier: 'Generic', name: '6×6×6',    length: 6,    width: 6,    height: 6,   maxWeightLb: 50 },
  { id: 'generic-8x6x4',    carrier: 'Generic', name: '8×6×4',    length: 8,    width: 6,    height: 4,   maxWeightLb: 50 },
  { id: 'generic-8x8x8',    carrier: 'Generic', name: '8×8×8',    length: 8,    width: 8,    height: 8,   maxWeightLb: 50 },

  // USPS Priority Mail
  { id: 'usps-small-fr',    carrier: 'USPS', name: 'Small Flat Rate',       length: 8.625, width: 5.375, height: 1.625, maxWeightLb: 70 },
  { id: 'usps-regional-a',  carrier: 'USPS', name: 'Regional Rate A',       length: 10.125,width: 7.125, height: 5,    maxWeightLb: 15 },

  // FedEx One Rate
  { id: 'fedex-xs',         carrier: 'FedEx', name: 'One Rate XS',          length: 10.875,width: 12.375,height: 1.5,  maxWeightLb: 10 },
  { id: 'fedex-s',          carrier: 'FedEx', name: 'One Rate S',           length: 12.375,width: 10.875,height: 1.5,  maxWeightLb: 10 },

  // Generic medium
  { id: 'generic-10x10x10', carrier: 'Generic', name: '10×10×10',  length: 10,   width: 10,   height: 10,  maxWeightLb: 50 },
  { id: 'generic-12x9x6',   carrier: 'Generic', name: '12×9×6',   length: 12,   width: 9,    height: 6,   maxWeightLb: 50 },
  { id: 'generic-12x12x6',  carrier: 'Generic', name: '12×12×6',  length: 12,   width: 12,   height: 6,   maxWeightLb: 50 },

  // UPS Simple Rate
  { id: 'ups-xs',           carrier: 'UPS', name: 'Simple Rate XS',        length: 13,   width: 11,   height: 2,   maxWeightLb: 50 },
  { id: 'ups-s',            carrier: 'UPS', name: 'Simple Rate S',         length: 16,   width: 13,   height: 3,   maxWeightLb: 50 },

  // USPS medium flat rate
  { id: 'usps-med-fr-1',    carrier: 'USPS', name: 'Medium Flat Rate #1',  length: 11.25, width: 8.75, height: 6,   maxWeightLb: 70 },
  { id: 'usps-regional-b',  carrier: 'USPS', name: 'Regional Rate B',      length: 12.25, width: 10.5, height: 5.5, maxWeightLb: 20 },
  { id: 'usps-med-fr-2',    carrier: 'USPS', name: 'Medium Flat Rate #2',  length: 13.625,width: 11.875,height: 3.375,maxWeightLb: 70 },
  { id: 'usps-large-fr',    carrier: 'USPS', name: 'Large Flat Rate',      length: 12.25, width: 12.25,height: 6,   maxWeightLb: 70 },

  // FedEx medium
  { id: 'fedex-m',          carrier: 'FedEx', name: 'One Rate M',          length: 13.25, width: 11.5, height: 2.375,maxWeightLb: 25 },

  // Generic 12x12x12
  { id: 'generic-12x12x12', carrier: 'Generic', name: '12×12×12', length: 12,   width: 12,   height: 12,  maxWeightLb: 50 },

  // UPS medium/large
  { id: 'ups-m',            carrier: 'UPS', name: 'Simple Rate M',         length: 18,   width: 13,   height: 4,   maxWeightLb: 50 },
  { id: 'ups-l',            carrier: 'UPS', name: 'Simple Rate L',         length: 21,   width: 16,   height: 6,   maxWeightLb: 50 },

  // Generic large
  { id: 'generic-16x12x8',  carrier: 'Generic', name: '16×12×8',  length: 16,   width: 12,   height: 8,   maxWeightLb: 50 },
  { id: 'generic-18x18x16', carrier: 'Generic', name: '18×18×16', length: 18,   width: 18,   height: 16,  maxWeightLb: 50 },

  // FedEx large
  { id: 'fedex-l',          carrier: 'FedEx', name: 'One Rate L',          length: 17.5, width: 12.375,height: 3,  maxWeightLb: 50 },

  // UPS XL
  { id: 'ups-xl',           carrier: 'UPS', name: 'Simple Rate XL',        length: 27,   width: 17,   height: 5,   maxWeightLb: 50 },
  { id: 'fedex-xl',         carrier: 'FedEx', name: 'One Rate XL',         length: 24,   width: 20,   height: 6,   maxWeightLb: 70 },

  // Generic XL
  { id: 'generic-24x18x18', carrier: 'Generic', name: '24×18×18', length: 24,   width: 18,   height: 18,  maxWeightLb: 50 },
  { id: 'generic-24x24x24', carrier: 'Generic', name: '24×24×24', length: 24,   width: 24,   height: 24,  maxWeightLb: 50 },
  { id: 'ups-xxl',          carrier: 'UPS', name: 'Simple Rate XXL',       length: 27,   width: 17,   height: 17,  maxWeightLb: 50 },
]

// Ensure boxes are sorted ascending by volume
STANDARD_BOXES.sort((a, b) => (a.length * a.width * a.height) - (b.length * b.width * b.height))
