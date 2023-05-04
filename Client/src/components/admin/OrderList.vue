<template>
    <h1>Quản lý hoá đơn</h1>
    <div class="handler-bar d-flex justify-content-between my-2" style="height: 40px;">
        <div></div>
        <div class="form-group">
            <input type="email" v-model="searchText" class="form-control shadow-sm" placeholder="Tìm kiếm...">
        </div>
    </div>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>STT</th>
                <th>Tên khách hàng</th>
                <th>Tổng tiền</th>
                <th>Ngày tạo</th>
                <th>Ngày chỉnh sửa</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(order, index) in filteredOrders" :key="order._id">
                <td>{{ index + 1 }}</td>
                <td>{{ order.customer.name }}</td>
                <td>{{ formatCurrentcy(order.total) }}</td>
                <td>{{ order.created_at }}</td>
                <td>{{ order.updated_at }}</td>
                <td>
                    <router-link :to="{ name: 'admin.order.detail', params: { id: order._id } }">
                        <button type="button" class="btn btn-info mr-2">Chi tiết</button>
                    </router-link>
                    <button v-if="order.status == 0" type="button" @click="updateOrderStatus(order._id)"
                        class="btn btn-success">Duyệt</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import OrderService from "@/services/order.service";

export default defineComponent({
    props: {
        orders: { type: Array, default: [] },
    },
    emits: ["rerender:orders"],
    setup(props, context) {
        const searchText = ref("");
        const filteredOrders = computed(() => {
            if (!searchText.value) {
                return reactive(props.orders);
            }
            return props.orders.filter((order) =>
                Object.values(order).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });
        //Đổi thành duyệt
        const updateOrderStatus = async (id) => {
            if (confirm("Bạn muốn xóa đơn hàng này?")) {
                try {
                    await OrderService.update(id);
                    context.emit("rerender:orders", reactive(props.orders));
                } catch (error) {
                    console.log(error);
                }
            }
        };

        const formatCurrentcy = (number) => {
            return Number(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        return {
            searchText,
            filteredOrders,
            updateOrderStatus,
            formatCurrentcy,
        };
    },
});
</script>