<template>
    <div>
        Home page
        <div v-if="isLoggedIn">
            Hello, {{ user?.name }}
        </div>
    </div>
</template>

<script setup>
    const {user, isLoggedIn} = useUserStoreValues();
</script>