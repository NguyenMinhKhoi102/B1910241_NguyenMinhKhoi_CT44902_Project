<template>
    <div class="header px-5 mb-2">
        <div class="logo"><img src="http://localhost:3000/uploads/logo.png" alt="chưa load">
        </div>
        <ul class="nav">
            <router-link :to="{ name: 'home' }">
                <li class="nav-item">Trang chủ</li>
            </router-link>
            <li class="nav-item">Giới thiệu</li>
            <router-link :to="{ name: 'product' }">
                <li class="nav-item">Sản phẩm</li>
            </router-link>
            <li class="nav-item">Liên hệ</li>
        </ul>
        <div v-if="store.isAuthenticated && !store.isAuthorizated" class="customer">
            <input class="search" placeholder="Search">
            <div class="icon user">
                <i class="fas fa-user"></i>
                <div class="signout" @click="signOut">Đăng xuất</div>
            </div>
            <router-link :to="{ name: 'cart' }">
                <i class="fas fa-cart-shopping icon"></i>
            </router-link>
        </div>
        <div v-if="!store.isAuthenticated && !store.isAuthorizated" class="customer">
            <input class="search" placeholder="Search">
            <router-link :to="{ name: 'signin' }">
                <button class="signin">Đăng nhập</button>
            </router-link>
            <router-link :to="{ name: 'signup' }">
                <button class="signup">Đăng ký</button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { useStore } from '@/stores/store';
import { defineComponent } from "vue";
import { useRouter } from "vue-router"
import adminService from "@/services/admin.service";
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const signOut = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                };
                await adminService.signOut({ headers });
                localStorage.removeItem('token');
                store.setIsAuthenticated(false);
                router.push({ name: 'home' });
            } catch (error) {
                console.log(error);
            }
        };
        return { store, signOut, }
    },
});
</script>
<style>
.header {
    height: 60px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0.1px 10px rgba(0, 0, 0, 0.179);
}

.header .logo img {
    width: 60px;
}

.header .nav {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 50px;
}

.header .nav .nav-item {
    cursor: pointer;
    transition: all ease-in-out 0.3s;
}

.header .nav .nav-item:hover {
    color: orange;
}

.header .customer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.header .customer input,
.signin,
.signup {
    height: 30px;
    border: 1px solid orange;
    border-radius: 20px;
    font-size: 14px;
    padding-inline: 10px;
    margin-right: 15px;
    background-color: white;
    transition: all ease-in-out 0.3s;
}

.signin:hover,
.signup:hover {
    background-color: orange;
    color: white;
}

.header .customer .icon {
    position: relative;
    color: orange;
    font-size: 18px;
    margin-inline: 10px;
}

.header li {
    color: black;
}

a:hover {
    text-decoration: none;
}

.signout {
    position: absolute;
    width: 150px;
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid orange;
    left: -70px;
    text-align: center;
    transition: all ease-in-out 0.2s;
    cursor: pointer;
    font-weight: bold;
    opacity: 0;
    visibility: hidden;
}

.signout:hover {
    background-color: orange;
    color: black;
}

.user:hover>.signout {
    opacity: 1;
    visibility: visible;
}
</style>
