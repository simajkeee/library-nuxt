<template>
    <div>
        <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/bestsellers/lists">Bestsellers lists</NuxtLink></li>
            <li v-if="isLoggedIn"><NuxtLink to="/profile">My profile</NuxtLink></li>
            <li v-if="!isLoggedIn"><NuxtLink to="/registration">Registration</NuxtLink></li>
            <li v-if="!isLoggedIn"><NuxtLink to="/login">Login</NuxtLink></li>
            <li v-if="isLoggedIn"><NuxtLink to="#" @click="logOut()">Logout</NuxtLink></li>
        </ul>
    </div>
</template>

<script setup>
    const {logOut, isLoggedIn} = useUserStoreValues();
</script>