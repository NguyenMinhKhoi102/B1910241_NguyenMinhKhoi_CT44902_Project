<template>
    <div class="m-auto" style="width: 35%;">
        <h4 class="text-center">Thêm Danh mục</h4>
        <CategoryForm :category="{}" @submit:category="addCategory" />
        <p>{{ message }}</p>
    </div>
</template>

<script>

import CategoryForm from "@/components/admin/CategoryForm.vue";
import CategoryService from "@/services/category.service";
import { defineComponent, ref } from "vue"

export default defineComponent({
    components: {
        CategoryForm,
    },
    setup(props, context) {
        const message = ref("");
        const addCategory = async (data) => {
            try {
                await CategoryService.create(data);
                message.value = "Danh mục được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        }
        return {
            message,
            addCategory,
        }
    },

});
</script>