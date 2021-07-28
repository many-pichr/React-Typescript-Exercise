import http from "./apiClient";
class Apis {
  async getAll(): Promise<any> {
    return http.get("/users?per_page=20");
  }
  get(uri: string): Promise<any> {
    return http.get(uri);
  }
}
export default new Apis();
