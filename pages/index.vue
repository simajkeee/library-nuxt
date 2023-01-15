<template>
    <div>
        Home page
        <div v-if="isLoggedIn">
            Hello, {{ user.name }}
        </div>
    </div>
</template>

<script setup>
    import { useUserStore } from "~~/stores/user";
    import { storeToRefs } from "pinia";
    const storage = useUserStore()
    const {user, isLoggedIn} = storeToRefs(storage);

</script>