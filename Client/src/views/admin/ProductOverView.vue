<template>
    <div>
        <ProductList :products="products" />
        <div v-if="!products.length">Không có sản phẩm.</div>
    </div>
</template>

<script>
import ProductList from "@/components/admin/ProductList.vue";
import { useRouter } from "vue-router";
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        ProductList,
    },

    props: {
        products: { type: Array, default: [] },
    },

    setup(props, context) {
        const router = useRouter();

        const goToAddProduct = () => {
            router.push({ name: "admin.product.add" });
        };

        return {
            goToAddProduct,
        };
    },
});
</script>