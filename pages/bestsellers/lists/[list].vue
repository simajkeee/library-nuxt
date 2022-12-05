<template>
    <div>
        <ListBestsellersBooks :listName="listName" :key="$route.fullPath" />
    </div>
</template>

<script setup>
const route = useRoute();
const listName = (route.params.list === undefined) ? "" : route.params.list;
</script>