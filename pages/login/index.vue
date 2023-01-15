<template>
    <div>
        <div v-if="(errors != null)">
            <div v-for="(err, type) in errors" :id="type">
                <h4>{{type}}</h4>
                <ul>
                    <li v-for="(errMsg, i) in err" :id="i">{{errMsg}}</li>
                </ul>
            </div>
        </div>
        <div>
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
    </div>
</template>

<script setup>
    import {useUserStore} from '~~/stores/user';

    const email = ref("");
    const password = ref("");
    const errors = ref(null);

    async function formSubmit() {
        const store = useUserStore();
        const {logIn} = store;

        errors.value = null;
        try {
            await logIn(email, password);
            navigateTo("/");
        } catch(err) {
            errors.value = useDefaultError(err).errors;
        }
    }
</script>