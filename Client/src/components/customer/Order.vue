<template>
    <div class="order m-0" style="border-radius: 0;">
        <div class="text-center font-weight-bold m-2" style="font-size: 20px; color: black;">Đơn hàng</div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th class="text-center" scope="col">STT</th>
                    <th class="text-center" scope="col">Sản phẩm</th>
                    <th class="text-center" scope="col" style="width: 110px;">Thành tiền</th>
                </tr>
            </thead>
            <tbody v-if="cart.products && cart.products.length == 0">
                <tr>
                    <td class="text-center" colspan="3">Không có sản phẩm trong đơn hàng</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="(product, index) in cart.products">
                    <th scope="row">{{ index }}</th>
                    <td>{{ product.name + " x" + product.quantity }}</td>
                    <td>{{ formatCurrentcy(product.price * product.quantity) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="p-2" style="font-size: 20px;">
            <strong>Tổng cộng:</strong> <span>{{ formatCurrentcy(total) }}</span>
        </div>
        <div class="text-center my-3">
            <button :disabled="cart.products && cart.products.length == 0" class="btn btn-primary px-5"
                style="font-size: 20px !important;" @click="order({ products: cart.products, total: total })">
                Đặt hàng
            </button>
        </div>
    </div>
</template>
<script>
import { computed, defineComponent } from 'vue';
export default defineComponent({
    props: {
        cart: { type: Object, required: true }
    },
    setup(props, context) {
        const formatCurrentcy = (number) => {
            return Number(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        };

        const total = computed(() => {
            let sum = 0;
            if (props.cart && props.cart.products) {
                props.cart.products.forEach((product) => {
                    sum += product.price * product.quantity;
                });
            }
            return sum;
        });

        const order = (data) => {
            context.emit("submit:order", data);
        }


        return { total, formatCurrentcy, order }
    }
});
</script>
<style>
.order {
    border: 1px solid gainsboro;
}
</style>