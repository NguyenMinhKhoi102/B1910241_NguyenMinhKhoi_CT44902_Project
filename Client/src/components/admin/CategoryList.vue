<template>
    <div class="page-heading" style="">
        <h1>Quản lý danh mục</h1>
        <div class="handler-bar d-flex justify-content-between my-2" style="height: 40px;">
            <button class="btn btn-primary shadow-sm" @click="goToAddCategory">Thêm danh mục</button>
            <div class="form-group">
                <input type="email" v-model="searchText" class="form-control shadow-sm" placeholder="Tìm kiếm...">
            </div>
        </div>
        <table class="table table-bordered">
            <thead class="thead-light">
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên danh mục</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Ngày chỉnh sửa</th>
                    <th scope="col">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in filteredCategories" :key="category._id">
                    <th>{{ index + 1 }}</th>
                    <td>{{ category.name }}</td>
                    <td>{{ category.created_at }}</td>
                    <td>{{ category.updated_at }}</td>
                    <td>
                        <router-link :to="{
                            name: 'admin.category.edit',
                            params: { id: category._id },
                        }">
                            <button class="btn btn-warning mr-2 shadow-sm">Sửa</button>
                        </router-link>
                        <button class="btn btn-danger shadow-sm" @click="deleteCategory(category._id)">Xoá</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>

import { defineComponent, reactive, ref, computed } from "vue";
import CategoryService from "@/services/category.service";
import { useRouter } from "vue-router";

export default defineComponent({

    props: {
        categories: { type: Array, default: [] },
    },

    setup(props, context) {

        const router = useRouter();
        const categories = reactive(props.categories);
        const searchText = ref("");

        const filteredCategories = computed(() => {
            if (!searchText.value) {
                return reactive(props.categories);
            }
            return props.categories.filter((category) =>
                Object.values(category).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const deleteCategory = async (id) => {
            if (confirm("Bạn muốn xóa Danh mục này?")) {
                try {
                    await CategoryService.delete(id);
                    context.emit("rerender:categories", categories);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        const goToAddCategory = () => {
            router.push({ name: "admin.category.add" });
        };

        return {
            searchText,
            filteredCategories,
            deleteCategory,
            goToAddCategory,
        };
    },
});
</script>