<template>
    <div>
        <form @submit="formSubmit">
            <div>
                <label for="login">Login: </label>
                <input id="login" type="text">
            </div>
            <div>
                <label for="password">Password: </label>
                <input id="password" type="password">
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>
</template>

<script setup>
async function formSubmit() {
    useFetch("http://api.books.com:8000/sanctum/csrf-cookie").then(resp => {
        console.log(resp);
    })
    alert("form has been submitted!");
}
</script>