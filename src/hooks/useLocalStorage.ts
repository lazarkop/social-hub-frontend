const useLocalStorage = (
  key: string,
  type: 'set' | 'get' | 'delete'
): ((newValue: string | boolean) => void) | (() => void) | string | void => {
  if (type === 'get') {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : '';
  } else if (type === 'set') {
    const setValue = (newValue: string | boolean) => {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    };
    return setValue;
  } else {
    const deleteValue = () => {
      window.localStorage.removeItem(key);
    };
    return deleteValue;
  }
};
export default useLocalStorage;
