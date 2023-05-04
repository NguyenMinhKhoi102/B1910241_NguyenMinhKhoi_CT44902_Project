<template>
    <div class="admin-page">
        <div class="sidebar shadow-sm" :class="{ hidden: state.hidden }">
            <div class="sidebar-header">
                <img src="http://localhost:3000/uploads/logo.png" alt="">
                <div class="author text">Công ty cổ phần vật tư <br>nông nghiệp ZFarm</div>
            </div>
            <hr>
            <div class="sidebar-main">
                <div class="non-dropdown" @click="goToDashBoard"
                    :style="{ 'background-color': state.present == 1 ? 'orange' : '' }">
                    <span>
                        <i class="fas fa-tachometer iconTitle"></i>
                        <span class="text">Bảng điều khiển</span>
                    </span>
                </div>
                <div class="non-dropdown" @click="goToCategory"
                    :style="{ 'background-color': state.present == 2 ? 'orange' : '' }">
                    <span>
                        <i class="fas fa-list-alt iconTitle"></i>
                        <span class="text">Quản lý danh mục</span>
                    </span>
                </div>
                <div class="dropdown">
                    <div class="dropdown-select" @click="goToProduct"
                        :style="{ 'background-color': state.present == 3 ? 'orange' : '' }">
                        <span class="dropdown-value">
                            <i class="fas fa-shopping-cart iconTitle"></i>
                            <span class="text">Quản lý sản phẩm</span>
                        </span>
                        <i class="fas fa-caret-up text"
                            :style="{ 'transform': state.actived ? 'rotate(900deg)' : '', 'transition': 'all ease-in-out 0.5s' }"></i>
                    </div>
                    <div class="dropdown-list" :class="{ actived: state.actived }">
                        <div class="dropdown-item text" v-for="(category, index) in state.categories" :key="category._id"
                            @click="setSelectedCategory(category)">
                            {{ category.name }}
                        </div>
                    </div>
                </div>
                <div class="non-dropdown" @click="goToCustomer"
                    :style="{ 'background-color': state.present == 4 ? 'orange' : '' }">
                    <span>
                        <i class="fas fa-users iconTitle"></i>
                        <span class="text">Quản lý khách hàng</span>
                    </span>
                </div>
                <div class="non-dropdown" @click="goToOrder"
                    :style="{ 'background-color': state.present == 5 ? 'orange' : '' }">
                    <span>
                        <i class="fas fa-file-text iconTitle" style="padding-left: 5px;"></i>
                        <span class="text">Quản lý hoá đơn</span>
                    </span>
                </div>
            </div>
            <div class="sidebar-footer">
                <hr>
                <div class="non-dropdown" @click="signOut">
                    <span>
                        <i class="fas fa-sign-out iconTitle"></i>
                        <span class="text">Đăng xuất</span>
                    </span>
                </div>
            </div>
        </div>
        <main :style="{
                'width': state.hidden ? 'calc(100% - 80px)' : 'calc(100% - 269px)',
                'left': state.hidden ? '80px' : '269px'
            }">
            <div class="appbar shadow-sm">
                <div class="hamburger">
                    <i class="fas fa-bars" @click="onHidden"></i>
                </div>
                <div class="info-admin">
                    <img src="https://png.pngtree.com/png-vector/20190623/ourlarge/pngtree-accountavataruser--flat-color-icon--vector-icon-banner-templ-png-image_1491720.jpg"
                        alt="">
                    username
                </div>
            </div>
            <div class="content px-3 mt-5">
                <router-view v-slot="{ Component }">
                    <component :products="filteredProducts" :is="Component" />
                </router-view>
            </div>
        </main>
    </div>
</template>

<script>

import { defineComponent, reactive, onMounted, computed } from 'vue';
import { useRouter } from "vue-router";
import CategoryService from "@/services/category.service";
import ProductService from "@/services/product.service";

export default defineComponent({
    emits: ["submit:signout"],
    setup(props, context) {

        const router = useRouter();
        const state = reactive({
            actived: false,
            hidden: false,
            present: 1,
            products: [],
            categories: [],
            selectedCategory: null,
        });

        const retrieveProducts = async () => {
            try {
                state.products = await ProductService.all();
                console.log(state.products);
            } catch (error) {
                console.log(error);
            }
        };

        const retrieveCategories = async () => {
            try {
                state.categories = await CategoryService.all();
            } catch (error) {
                console.log(error);
            }
        };

        const filteredProducts = computed(() => {
            if (!state.selectedCategory) {
                return state.products;
            }
            return state.products.filter(product => product.category._id === state.selectedCategory._id);
        });

        const setSelectedCategory = (categories) => {
            state.selectedCategory = categories;
            console.log(state.selectedCategory);
        }

        const onHidden = () => {
            state.actived = false;
            state.hidden = !state.hidden;
        }

        const signOut = () => {
            context.emit("submit:signout");
        };

        const goToDashBoard = () => {
            state.present = 1;
            state.actived = false;
            router.push({ name: "admin.dashboard.show" });
        };

        const goToCategory = () => {
            state.present = 2;
            state.actived = false;
            router.push({ name: "admin.category.all" });
        };

        const goToProduct = () => {
            state.present = 3;
            state.actived = !state.actived;
            state.hidden = false;
            state.selectedCategory = null;
            router.push({ name: "admin.product.all" });
        };

        const goToCustomer = () => {
            state.present = 4;
            state.actived = false;
            router.push({ name: "admin.customer.all" });
        };

        const goToOrder = () => {
            state.present = 5;
            state.actived = false;
            router.push({ name: "admin.order.all" });
        };

        onMounted(() => {
            retrieveCategories();
            retrieveProducts();
        })

        return {
            state,
            filteredProducts,
            setSelectedCategory,
            onHidden,
            signOut,
            goToDashBoard,
            goToCategory,
            goToProduct,
            goToCustomer,
            goToOrder,
        }
    }
});

</script>
<style>
.admin-page {
    display: flex;
    position: relative;
}

.sidebar {
    /* width: 300px; */
    max-width: 269px;
    background-color: aliceblue;
    min-height: 100vh;
    height: 500px;
    padding: 20px;
    visibility: visible;
    opacity: 1;
    position: fixed;
    z-index: 10;
    transition: max-width ease-in-out 0.5s;
}

.text {
    opacity: 1;
    visibility: visible;
    white-space: nowrap;
    transition: all ease-in-out 0.2s;
}

.sidebar.hidden {
    max-width: 80px;
}

.sidebar.hidden .text {
    visibility: hidden;
    opacity: 0;
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    transition: all ease-in-out 0.4s;
}

.sidebar-header img {
    max-width: 80px;
    height: 50px;
    border-radius: 10px;
}

/* .sidebar-main {} */
.sidebar-main .non-dropdown,
.sidebar-footer .non-dropdown {
    margin-block: 15px;
    padding-inline: 10px;
    white-space: nowrap;
    min-width: 45px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    transition: all ease-in-out 0.2s;
}

.non-dropdown:hover,
.sidebar-main .dropdown-select:hover {
    background-color: rgba(255, 166, 0, 0.602);
}

.sidebar-main .dropdown {
    margin-block: 15px;
}


.sidebar-main .dropdown-select {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap !important;
    min-width: 45px;
    border-radius: 10px;
    height: 40px;
    padding-inline: 10px;
    z-index: 5;
    transition: all ease-in-out 0.2s;
}

.sidebar-main .dropdown-list {
    width: 100%;
    opacity: 0;
    visibility: hidden;
    z-index: -1;
    position: absolute;
    top: 0;
    transform: translateY(-2em);
    transition: all ease-in-out 0.5s;
}

.sidebar-main .actived {
    position: relative;
    opacity: 1;
    z-index: 1;
    visibility: visible;
    transform: translateY(0);
}

.sidebar-main .dropdown-item {
    display: block;
    margin: 5px 20px;
    padding: 5px 20px;
    width: calc(100% - 20px);
    border-radius: 10px;
}

.sidebar-main .dropdown-item:hover {
    background-color: rgba(255, 166, 0, 0.711);
}

.sidebar-footer {
    position: absolute;
    width: 100%;
    bottom: 40px;
    padding-right: 40px;
}

.iconTitle {
    font-size: 20px;
    width: 45px;
}

main {
    position: relative;
    transition: all ease-in-out 0.5s;
}

.appbar {
    width: 100%;
    height: 50px;
    background-color: aliceblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.appbar .hamburger {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.appbar .hamburger i {
    font-size: 20px;
    background-color: gainsboro;
    padding: 5px 10px;
    border-radius: 5px;
}

.info-admin {
    margin-right: 20px;
}

.info-admin img {
    width: 30px;
    height: 30px;
    border-radius: 100rem;
    border: 1px solid black;
    margin-right: 10px;
}
</style>