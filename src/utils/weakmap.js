let latestId = 0;

function CrappyWeakmap() {
  const id = `___react-redux-scroll${++latestId}___`; // eslint-disable-line no-plusplus

  this.set = (key, value) => {
    const entryMap = key[id];
    if (entryMap && entryMap.key === key) {
      entryMap.value = value;
    } else {
      Object.defineProperty(
        key,
        id,
        { enumerable: false, value: { key, value }, writable: true }
      );
    }
    return this;
  };

  this.delete = (key) => {
    const entryMap = key[id];
    if (!entryMap) return false;
    const isEmpty = entryMap.key !== key;
    entryMap.key = undefined;
    entryMap.value = undefined;
    return !isEmpty;
  };

  this.get = key =>
    (key[id] && key[id].key === key ? key[id].value : undefined);

  this.has = key => Boolean(key[id] && key[id].key === key);
}

export default window.WeakMap || CrappyWeakmap;
