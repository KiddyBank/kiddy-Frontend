import AsyncStorage from '@react-native-community/async-storage';

export async function getKeys() {
  return await AsyncStorage.getAllKeys();
}

export async function getAllStorage(cb = null) {
  try {
    let allKeys = await getKeys();
    let data = await AsyncStorage.multiGet(allKeys);
    return Object.fromEntries(data);
  } catch (error) {
    cb !== null && cb(error);
  }
}

export async function getStorage(key, cb = null) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    cb !== null && cb(error);
  }
}

export async function setStorage(key, value, cb = null) {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    cb !== null && cb(error);
  }
}

export async function getMultiStorage(keys, cb = null) {
  try {
    return Object.fromEntries(await AsyncStorage.multiGet(keys));
  } catch (error) {
    cb !== null && cb(error);
  }
}

export async function setMultiStorage(keyValuePairs, cb = null) {
  try {
    return AsyncStorage.multiSet(keyValuePairs);
  } catch (error) {
    cb !== null && cb(error);
  }
}

export async function removeItemStorage(key, cb = null) {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    cb !== null && cb(error);
  }
}

export async function removeMultiStorage(keys, cb) {
  try {
    return await AsyncStorage.multiRemove(keys);
  } catch (error) {
    cb !== null && cb(error);
  }
}

export async function clearStorage(cb = null) {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    cb !== null && cb(error);
  }
}
