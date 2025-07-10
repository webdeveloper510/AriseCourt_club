import AsyncStorage from '@react-native-async-storage/async-storage';


export const _setItem = (key, value) => {
    return new Promise(async (resolve, reject) => {
        await AsyncStorage.setItem(key, value)
            .then(() => {
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            })
    })
}


export const _getItem = (key) => {
    return new Promise(async (resolve, reject) => {
        await AsyncStorage.getItem(key)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
    })
}