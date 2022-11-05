export class MemoryStorage {
  static setItem(key: string, value: any) {
    if (typeof value == "object")
      window.localStorage.setItem(key, JSON.stringify(value));
    else window.localStorage.setItem(key, value);
  }

  static getItem(key: string) {
    let value = window.localStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
}
