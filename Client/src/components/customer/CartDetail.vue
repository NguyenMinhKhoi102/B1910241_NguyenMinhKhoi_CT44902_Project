<template>
    <div class="cart-detail">
        <table class="table table-striped">
            <thead>
                <tr>
                    <td colspan="7" class="text-center font-weight-bold" style="font-size: 20px;">Danh sách sản phẩm</td>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Tạm tính</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody v-if="cart.products && cart.products.length == 0">
                <tr>
                    <td class="text-center" colspan="7">Không có sản phẩm trong đơn hàng</td>
                </tr>
            </tbody>
            <tbody>
                <tr v-for="(product, index) in cart.products">
                    <th scope="row">{{ index }}</th>
                    <td><img width="50" :src="'http://localhost:3000/' + product.image" alt=""></td>
                    <td>{{ product.name }}</td>
                    <td><input type="number" v-model="product.quantity"></td>
                    <td>{{ formatCurrentcy(product.price) }}</td>
                    <td>{{ formatCurrentcy(product.price * product.quantity) }}</td>
                    <td>
                        <button class="btn btn-warning py-1 px-3 shadow m-1"
                            @click="updateOne({ product_id: product._id, quantity: product.quantity })">
                            <i class="fas fa-refresh"></i>
                        </button>
                        <button class="btn btn-danger py-1 px-3 shadow m-1" @click="deleteOne(product._id)">
                            <i class="fas fa-trash-alt" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="text-right" v-if="cart.products && !cart.products.length == 0">
        <button class="btn btn-danger mt-2" @click="deleteAll">
            <i class="fas fa-trash-alt" aria-hidden="true"></i> Xoá tất cả
        </button>
    </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        cart: { type: Object, required: true }
    },
    emits: ["delete:product", "delete:cart", "update:product"],
    setup(props, context) {
        const formatCurrentcy = (number) => {
            return Number(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        };
        const deleteOne = (product_id) => {
            context.emit("delete:product", product_id);
        }
        const deleteAll = () => {
            context.emit("delete:cart");
        }
        const updateOne = (data) => {
            context.emit("update:product", data);
        }
        return { formatCurrentcy, deleteOne, deleteAll, updateOne }
    }
});
</script>
<style>
.cart-detail {
    border: 1px solid gainsboro;
}

.cart-detail input[type="number"] {
    width: 50px;
}
</style>