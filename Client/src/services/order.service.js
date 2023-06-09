import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async all() {
        return (await this.api.get("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id) {
        return (await this.api.patch(`/${id}`)).data;
    }
}

export default new OrderService;