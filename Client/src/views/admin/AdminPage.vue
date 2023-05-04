<template>
    <AppSideBar @submit:signout="signOut" />
</template>
<script>
import { defineComponent } from 'vue';
import AppSideBar from '@/components/admin/AppSideBar.vue';
import { useStore } from '@/stores/store';
import { useRouter } from "vue-router"
import adminService from "@/services/admin.service";


export default defineComponent({
    components: {
        AppSideBar,
    },
    setup(props, context) {
        const store = useStore();
        const router = useRouter();

        const signOut = async () => {
            try {
                console.log(123);
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await adminService.signOut({ headers });
                localStorage.removeItem('token');
                store.setIsAuthenticated(false);
                store.setRole("user");
                router.push({ name: 'admin.signin' });
            } catch (error) {
                console.log(error);
            }
        };

        return {
            store,
            signOut,
        }
    }
});
</script>