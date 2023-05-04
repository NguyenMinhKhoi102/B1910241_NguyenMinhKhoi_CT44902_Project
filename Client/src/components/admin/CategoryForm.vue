<template>
    <Form @submit="submitCategory" :validation-schema="categoryFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="categoryLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
        </div>
    </Form>
</template>

<script>

import { defineComponent, reactive } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        category: { type: Object, required: true }
    },
    setup(props, context) {
        const categoryLocal = reactive(props.category);

        const categoryFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });

        const submitCategory = () => {
            context.emit("submit:category", categoryLocal);
        };

        return {
            categoryLocal,
            categoryFormSchema,
            submitCategory,
        };
    },
});
</script>