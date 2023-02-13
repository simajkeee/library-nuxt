<template>
    <div>
        <div v-if="message">
            {{ message }}
        </div>
        
        <div v-if="show">
            <form @submit.prevent="formSubmit">
                <div>
                    <label for="name">Name: </label>
                    <input v-model="name" id="name" type="text">
                </div>
                <div>
                    <label for="email">Email: </label>
                    <input v-model="email" id="email" type="text">
                </div>
                <div>
                    <label for="password">Password: </label>
                    <input v-model="password" id="password" type="password">
                </div>
                <div>
                    <label for="password_confirmation">Password confirmation: </label>
                    <input v-model="passwordConfirmation" id="password_confirmation" type="password">
                </div>
                <div>
                    <button type="submit">Register new user</button>
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
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);
    const passwordConfirmation = ref(null);
    async function formSubmit() {
        try {
            await useRegister(
                JSON.stringify({
                    "name": name.value,
                    "email": email.value,
                    "password": password.value,
                    "password_confirmation": passwordConfirmation.value,
                })
            );
            message.value = "User is registered successfuly";
            setTimeout(async () => {
                await navigateTo("/login")
            }, 3000)
        }catch(err) {
            throw createError({ statusCode: 422,  statusMessage: "Unable to register a new user" })
        }
    }
</script>