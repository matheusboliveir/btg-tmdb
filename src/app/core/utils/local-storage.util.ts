export class StorageUtil {
  public static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public static getItem<T>(key: string): T | null {
    const stringValue = localStorage.getItem(key);
    if (!stringValue) return null;
    return JSON.parse(stringValue) as T;
  }
  public static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
