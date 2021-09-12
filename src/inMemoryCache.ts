class InMemoryCache {
  private persisted: Record<string, any> = {};

  public async getAsync<T>(key: string, fetcher: () => Promise<T>) {
    if (!this.persisted[key]) this.set(key, await fetcher());
    return this.persisted[key] as T;
  }

  public getSync<T>(key: string, getter: () => T) {
    if (!this.persisted[key]) this.set(key, getter());
    return this.persisted[key] as T;
  }

  public async set<T>(key: string, value: T) {
    this.persisted[key].value = value;
  }

  public async revalidateAsync<T>(key: string, fetcher: () => Promise<T>) {
    if (this.persisted[key]) this.set(key, await fetcher());
  }

  public async revalidateSync<T>(key: string, getter: () => T) {
    if (this.persisted[key]) this.set(key, getter());
  }

  public printCache() {
    console.group("Show persisted");
    Object.entries(this.persisted).forEach(([key, { value }]) =>
      console.log(key, value)
    );
    console.groupEnd();
  }
}

const inMemoryCache = new InMemoryCache();
// @ts-ignore
window.printCache = () => inMemoryCache.printCache();

export default inMemoryCache;
