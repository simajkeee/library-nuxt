<template>
    <div>
        <h1>Bestsellers lists:</h1>

        <div>
            <div v-for="(list, index) in lists" :key="index">
                <h2><NuxtLink :to="'/bestsellers/lists/' + list.list_name_encoded">{{list.display_name}}</NuxtLink></h2> <!-- add link to list page -->
                <div>{{list.list_name_encoded}}</div>
                <div>Latest update: {{list.newest_published_date}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const lists = ref([])

const {data, error} = await useAsyncData(
        'bestsellers-lists',
        () => $fetch(`http://api.books.com:8000/api/bestsellers/lists`), 
        { pick: ['data'] }
    )

if (!error.value) {
    lists.value = data.value.data
}
</script>