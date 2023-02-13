<template>
    <div>
        <NuxtErrorBoundary>
            <HeaderDefault />
            <NuxtPage />
            <template #error="{ error }">
                <div>
                    <p>Oops, something went wrong:</p>
                    <p>{{ error.value.message }}</p>
                    <button @click="error.value = null">
                    Go back
                    </button>
                </div>
            </template>
        </NuxtErrorBoundary>
    </div>
</template>