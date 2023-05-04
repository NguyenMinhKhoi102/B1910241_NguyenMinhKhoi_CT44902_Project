import createApiClient from "./api.service";

class CartService {
    constructor(baseUrl = "/api/cart") {
        this.api = createApiClient(baseUrl);
    }
    async all() {
        return (await this.api.get("/")).data;
    }
    async add(data) {
        return (await this.api.post("/", data)).data;
    }
    async update(data) {
        return (await this.api.patch("/", data)).data;
    }
    async delete(product_id) {
        return (await this.api.delete(`/${product_id}`)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
}

export default new CartService;