<template>
    <div class="row m-0">
        <div class="col-9 pt-4 pl-2">
            <CartDetail :cart="cart" @update:product="updateProduct" @delete:product="deleteProduct"
                @delete:cart="deleteCart" />
        </div>
        <div class="col-3 pt-4 pr-2 pl-0">
            <Order :cart="tempCart" @submit:order="submitOrder" />
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, toRefs } from 'vue';
import Order from '@/components/customer/Order.vue';
import CartDetail from '@/components/customer/CartDetail.vue';
import CartService from '@/services/cart.service';
import OrderService from '@/services/order.service';

export default defineComponent({
    components: {
        CartDetail,
        Order,
    },
    setup(props, context) {
        const cart = ref({});
        const tempCart = ref({});
        const retrieveCarts = async () => {
            try {
                cart.value = await CartService.all();
                console.log(cart.value);
                tempCart.value = JSON.parse(JSON.stringify(cart.value));
            } catch (error) {
                console.log(error);
            }
        };
        const deleteProduct = async (product_id) => {
            if (confirm("Bạn có chắc muốn xoá sản phẩm này khỏi giỏ")) {
                await CartService.delete(product_id);
                await retrieveCarts();
            }

        }
        const deleteCart = async () => {
            if (confirm("Bạn có chắc muốn xoá toàn bộ giỏ hàng")) {
                await CartService.deleteAll();
                await retrieveCarts();
            }
        }

        const updateProduct = async (data) => {
            if (confirm("Bạn xác nhận muốn cập nhật số lượng sản phẩm trong giỏ hàng")) {
                await CartService.update(data);
                await retrieveCarts();
            }
        }

        const submitOrder = async (data) => {
            if (confirm("Bạn xác nhận muốn đặt hàng")) {
                await OrderService.create(data);
                await CartService.deleteAll();
                await retrieveCarts();
            }
        }

        retrieveCarts();
        return {
            cart,
            tempCart,
            retrieveCarts,
            deleteProduct,
            deleteCart,
            updateProduct,
            submitOrder,
        }
    }
});
</script>