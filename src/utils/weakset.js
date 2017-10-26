import CustomWeakMap from './weakmap';

function CrappyWeakSet() {
  const weakMap = new CustomWeakMap();
  this.add = val => weakMap.set(val, true);
  this.delete = val => weakMap.delete(val);
  this.has = val => weakMap.has(val);
}

let toExport; // eslint-disable-line
try {
  toExport = WeakSet;
} catch (e) {
  toExport = CrappyWeakSet;
}

export default toExport;
