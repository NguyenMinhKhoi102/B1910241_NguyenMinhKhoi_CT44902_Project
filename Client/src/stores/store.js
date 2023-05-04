import { defineStore, createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
const pinia = createPinia();

const persistedState = createPersistedState({
    key: 'PiniaPersistedstate',
    paths: ['isAuthenticated', 'role'],
    storage: localStorage,
});

pinia.use(persistedState);

export const useStore = defineStore({
    id: 'Authenticated',
    state: () => ({
        isAuthenticated: false,
        role: "user",
    }),
    actions: {
        setIsAuthenticated(isAuthenticated) {
            this.isAuthenticated = isAuthenticated;
        },
        setRole(role) {
            this.role = role;
        },
    },
    persist: true,
})