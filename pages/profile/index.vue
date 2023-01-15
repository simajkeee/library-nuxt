<template>
    <div>
        <div v-if="isLoggedIn">
            Hello, {{ user.name }}
        </div>
    </div>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '~~/stores/user';

    definePageMeta({
        middleware: ["auth"]
    });

    const store = useUserStore();
    const {user, isLoggedIn} = storeToRefs(store);
</script>