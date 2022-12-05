<template>
    <div>
        <ul class="pagination">
            <template v-for="(link, index) in links" :key="index">
                <li v-if="link.url">
                    <NuxtLink :to="`/bestsellers/lists/${link.url}`">{{link.label}}</NuxtLink>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    links: {
        type: Array,
        required: true
    },
})
</script>