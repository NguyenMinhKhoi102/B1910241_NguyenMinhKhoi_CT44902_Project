<template>
    <h1>Quản lý tài khoản</h1>
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
                <th>Email</th>
                <th>Họ tên</th>
                <th>SĐT</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Thao tác</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(customer, index) in filteredCustomers" :key="customer._id">
                <th>{{ index + 1 }}</th>
                <td>{{ customer.email }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.phone }}</td>
                <td>{{ customer.birthday }}</td>
                <td>{{ customer.sex === 1 ? 'Nam' : 'Nữ' }}</td>
                <td>{{ customer.address }}</td>
                <td>
                    <button type="button" @click="deleteCustomer(customer._id)" class="btn btn-danger ">Khoá</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import CustomerService from "@/services/customer.service";

export default defineComponent({

    props: {
        customers: { type: Array, default: [] },
    },

    emits: ["rerender:customers"],

    setup(props, context) {

        const searchText = ref("");

        const filteredCustomers = computed(() => {
            if (!searchText.value) {
                return reactive(props.customers);
            }
            return props.customers.filter((customer) =>
                Object.values(customer).some((value) =>
                    String(value).toLowerCase().includes(searchText.value.toLowerCase())
                )
            );
        });

        const deleteCustomer = async (id) => {
            if (confirm("Bạn muốn xóa khách hàng này?")) {
                try {
                    await CustomerService.delete(id);
                    context.emit("rerender:customers", reactive(props.customers));
                } catch (error) {
                    console.log(error);
                }
            }
        };

        return {
            searchText,
            filteredCustomers,
            deleteCustomer,
        };
    },
});
</script>