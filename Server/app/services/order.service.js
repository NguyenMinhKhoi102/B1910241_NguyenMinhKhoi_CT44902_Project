const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
    }

    extractOrderData(payload) {
        const order = {
            products: payload.products,
            total: payload.total,
            status: 0,
        };

        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }

    //Cần sửa lại tìm kiếm theo id của order
    async addToOrder(customer_id, payload) {
        const order = this.extractOrderData(payload);
        order.customer_id = new ObjectId(customer_id);
        order.created_at = new Date().toLocaleString();
        order.updated_at = new Date().toLocaleString();
        return await this.Order.insertOne(order);
    }

    async findById(id) {
        const cursor = await this.Order.aggregate([
            {
                $match: { _id: new ObjectId(id) },
            },
            {
                $lookup: {
                    from: "customer",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer",
                },
            },
            {
                $unwind: "$customer",
            },
            {
                $project: {
                    _id: 1,
                    "customer": 1,// Lấy tên của category
                    products: 1,
                    total: 1,
                    status: 1,
                    created_at: 1,
                    updated_at: 1,
                },
            },
        ]);
        console.log(cursor)
        return await cursor.toArray();
    }

    async find(filter) {
        // const cursor = await this.Order.find(filter);
        const cursor = await this.Order.aggregate([
            {
                $lookup: {
                    from: "customer",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer",
                },
            },
            {
                $unwind: "$customer",
            },
            {
                $project: {
                    _id: 1,
                    "customer": 1,// Lấy tên của category
                    products: 1,
                    total: 1,
                    status: 1,
                    created_at: 1,
                    updated_at: 1,
                },
            },
            {
                $match: filter,
            },
        ]);
        return await cursor.toArray();
    }

    async update(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = {
            status: 1,
            updated_at: new Date().toLocaleString(),
        };

        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result.value;
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
}

module.exports = OrderService;