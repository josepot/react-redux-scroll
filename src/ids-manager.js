export default function () {
  let latestId = 0;
  const availableIds = [];
  // eslint-disable-next-line no-plusplus
  this.getNewId = () => availableIds.splice(0, 1)[0] || ++latestId;
  this.releaseId = id => availableIds.push(id);
}
