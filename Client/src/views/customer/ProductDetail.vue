<template>
    <div class="product-detail row">
        <div class="col"></div>
        <div class="col-8 row">
            <img v-if="state.product" class="col-5 bg-dark" :src="'http://localhost:3000/' + state.product.image" alt="">
            <div class="col"></div>
            <div class="col-6 info-product">
                <div class="text-primary font-weight-bold" style="font-size: 30px;">
                    {{ state.product ? state.product.name : '' }}
                </div>
                <div>
                    {{ state.product ? state.product.description : '' }}
                </div>
                <div>Tình trạng: <i class="text-success">Còn hàng</i></div>
                <div class="text-danger font-weight-bold" style="font-size: 40px;">
                    {{ state.product ? formatCurrentcy(state.product.price) : '' }}
                </div>
                <div>
                    <button style="border-radius: 5px 0 0 5px; border: 1px solid gainsboro;"><i
                            class="fas fa-plus"></i></button>
                    <input type="number" name="" id="" style="border-radius: 0; width: 50px;border: 1px solid gainsboro">
                    <button style="border-radius: 0 5px 5px 0;border: 1px solid gainsboro">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div>
                    <button class="addcart">Thêm vào giỏ hàng</button>
                </div>
                <div>
                    <button class="order">Đặt hàng ngay</button>
                </div>
            </div>
        </div>
        <div class="col"></div>
    </div>
</template>
<script>
import { defineComponent, onBeforeMount, reactive } from 'vue';
import ProductService from "@/services/product.service";
export default defineComponent({
    props: {
        id: { type: String, required: true },
    },
    setup(props, context) {
        const state = reactive({ product: null })
        const getProduct = async () => {
            try {
                console.log(123);
                state.product = await ProductService.get(props.id);
                console.log(state.product)
            } catch (error) {
                console.log(error);
            }
        };

        const formatCurrentcy = (number) => {
            return Number(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        };

        onBeforeMount(async () => {
            await getProduct(props.id);
        });

        return { state, formatCurrentcy }
    }
});
</script>
<style>
.info-product {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.order,
.addcart {
    width: 300px;
    padding-block: 10px;
    margin: 5px;
    border-radius: 10px;
    border: 0;
}

.addcart {
    background-color: orange;
    color: white;
}

.order {
    background-color: white;
    color: orange;
    border: 2px solid orange;
}
</style>
