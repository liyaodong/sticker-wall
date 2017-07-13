const KEY = '___sticker__wall___';


const getStore = () => {
  let allData = {};

  try {
    allData = JSON.parse(window.localStorage.getItem(KEY));
  } catch(e) {
    console.error(`parse error for sticker localStorage`);
  }

  return allData;
};

const dataList = getStore() || {};

const _setStore = obj => {
  window.localStorage.setItem(KEY, JSON.stringify(obj));
};

const get = key => {
  return _getStore()[key];
};

const set = (key, data) => {
  dataList[key] = data.toPlainData() || data;
  _setStore(dataList);
};

export default {
  set,
  get,
  getAllData: getStore
};
