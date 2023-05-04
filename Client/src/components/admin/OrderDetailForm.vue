<template>
    <table class="table table-bordered w-50 m-auto">
        <thead class="bg-light">
            <tr>
                <th scope="col" class="text-center" colspan="2">Thông tin người dùng</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Họ tên:</td>
                <td>{{ order.customer.name }}</td>
            </tr>
            <tr>
                <td>Giới tính:</td>
                <td>{{ order.customer.sex == 1 ? "Nam" : "Nữ" }}</td>
            </tr>
            <tr>
                <td>Ngày sinh:</td>
                <td>{{ order.customer.birthday }}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>{{ order.customer.email }}</td>
            </tr>
            <tr>
                <td>Số điện thoại:</td>
                <td>{{ order.customer.phone }}</td>
            </tr>
            <tr>
                <td>Địa chỉ</td>
                <td>{{ order.customer.address }}</td>
            </tr>
        </tbody>
    </table>
    <table class="table table-bordered mt-4">
        <thead class="bg-light">
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng cộng</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in order.products">
                <th scope="row">{{ index + 1 }}</th>
                <td><img :src="'http://localhost:3000/' + product.image" alt="" style="width: 80px;"></td>
                <td>{{ product.name }}</td>
                <td>{{ formatCurrentcy(product.price) }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ formatCurrentcy(product.price * product.quantity) }}</td>
            </tr>
        </tbody>
    </table>
    <div class="text-right">
        <button class="btn btn-primary px-5 py-3" @click="goToOrder">Trở về</button>
        <button v-if="order.status == 0" class="btn btn-success px-5 py-3 ml-3" @click="update(order._id)">Duyệt
            đơn</button>
    </div>
</template>

<script>

import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({

    props: {
        order: { type: Object, required: true },
    },
    emits: ["update:order"],
    setup(props, context) {
        const router = useRouter();
        const formatCurrentcy = (number) => {
            return Number(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }
        const update = (id) => {
            context.emit("update:order", id);
            router.push({ name: "admin.order.all" });
        }

        const goToOrder = () => {
            router.push({ name: "admin.order.all" });
        }

        return {
            formatCurrentcy,
            update,
            goToOrder,
        };
    },
});
</script>
  