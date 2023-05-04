<template>
    <h1>Quản lý sản phẩm</h1>
    <div class="handler-bar d-flex justify-content-between my-2" style="height: 40px;">
        <button class="btn btn-primary shadow-sm" @click="goToAddProduct">Thêm sản phẩm</button>
        <div class="form-group">
            <input type="email" v-model="searchText" class="form-control shadow-sm" placeholder="Tìm kiếm...">
        </div>
    </div>
    <table class="table table-bordered">
        <thead class="thead-light">
            <tr>
                <th style="white-space: nowrap" scope="col">STT</th>
                <th style="white-space: nowrap" scope="col">Hình ảnh</th>
                <th style="white-space: nowrap" scope="col">Tên sản phẩm</th>
                <th style="white-space: nowrap" scope="col">Giá</th>
                <th style="white-space: nowrap" scope="col">Mô tả</th>
                <th style="white-space: nowrap" scope="col">Ngày tạo</th>
                <th style="white-space: nowrap" scope="col">Ngày chỉnh sửa</th>
                <th style="white-space: nowrap" scope="col">Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in filteredProducts" :key="product._id">
                <th>{{ index + 1 }}</th>
                <td>
                    <img :src="'http://localhost:3000/' + product.image" alt="" style="width: 75px" />
                </td>
                <td>{{ product.name }}</td>
                <td>{{ formatCurrentcy(product.price) }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.created_at }}</td>
                <td>{{ product.updated_at }}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <router-link :to="{
                            name: 'admin.product.edit',
                            params: { id: product._id },
                        }">
                            <button type="button" class="btn btn-warning mr-2 shadow-sm">Sửa</button>
                        </router-link>
                        <button type="button" @click="deleteProduct(product._id)" class="btn btn-danger shadow-sm">
                            Xóa
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import ProductService from "@/services/product.service";
import { useRouter } from "vue-router";

export default defineComponent({
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
        category_id: { type: String, default: null }
    },
    emits: ["rerender:products"],
    setup(props, context) {
        const router = useRouter();
        const searchText = ref("");
        const filteredProducts = computed(() => {
            if (!searchText.value) {
                return reactive(props.products);
            }
            return props.products.filter((product) =>
                Object.values(product).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const deleteProduct = async (productId) => {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ProductService.delete(productId);
                    context.emit("rerender:products", reactive(props.products));
                } catch (error) {
                    console.log(error);
                }
            }
        };

        const goToAddProduct = () => {
            router.push({ name: "admin.product.add" });
        };

        const formatCurrentcy = (number) => {
            return Number(number).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        return {
            searchText,
            filteredProducts,
            deleteProduct,
            goToAddProduct,
            formatCurrentcy,
        };
    },
});
</script>