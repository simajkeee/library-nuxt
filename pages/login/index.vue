<template>
    <div>
        <div v-if="show">
            <div v-if="message">
                {{ message }}
            </div>
            <form @submit.prevent="formSubmit">
                <div>
                    <label for="email">Email: </label>
                    <input v-model="email" id="email" type="text">
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input v-model="password" id="password" type="password">
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
        <div v-else>
            <p>Loading page info...</p>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ["guest"]
    });

    const show = ref(false);
    onMounted(() => {
        show.value = true;
    });

    const message = ref("");
    const email = ref("");
    const password = ref("");

    async function formSubmit() {
        message.value = "";
        const {logIn} = useUserStoreValues();
        try {
            await logIn(email, password);
            navigateTo("/");
        } catch(error) {
            message.value = error;
        }
    }
</script>