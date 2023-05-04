<template>
    <div v-if="order" class="page">
        <h4 class="text-center fw-bolder">CHI TIẾT ĐƠN HÀNG</h4>
        <OrderForm :order="order[0]" @update:order="updateOrderStatus" />
        <p>{{ message }}</p>
    </div>
</template>

<script>

import OrderForm from "@/components/admin/OrderDetailForm.vue";
import OrderService from "@/services/order.service";
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    components: {
        OrderForm,
    },
    props: {
        id: { type: String, required: true },
    },
    setup(props, context) {
        const order = ref(null);
        const message = ref("");

        const getOrder = async () => {
            try {
                order.value = await OrderService.get(props.id);
            } catch (error) {
                console.log(error);
            }
        }

        const updateOrderStatus = async (id) => {
            if (confirm("Bạn muốn duyệt đơn hàng này?")) {
                try {
                    await OrderService.update(id);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        onMounted(async () => {
            await getOrder();
        });
        return {
            order,
            message,
            getOrder,
            updateOrderStatus,
        }
    },
});
</script>