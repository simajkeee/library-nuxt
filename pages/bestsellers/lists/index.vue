<template>
    <div>
        <div v-if="!loading">
            <h1>Bestsellers lists:</h1>

            <div>
                <div v-for="(list, index) in lists" :key="index">
                    <h2><NuxtLink :to="'/bestsellers/lists/' + list.list_name_encoded">{{list.display_name}}</NuxtLink></h2> <!-- add link to list page -->
                    <div>{{list.list_name_encoded}}</div>
                    <div>Latest update: {{list.newest_published_date}}</div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Bestseller lists are loading...</p>
        </div>
    </div>
</template>

<script setup>
    const loading = ref(true);
    const lists = ref([])
    const {data, error, pending, refresh} = await useLazyAsyncData(
        'bestsellers-lists',
        () => $fetch("/api/bestsellers/lists", {
            baseURL: useBaseUrl()
        }),
        { pick: ['data'] }
    );
    
    if (!pending.value) {
        refresh();
    }
    watch(data, (newData) => {
        loading.value = false;
        lists.value = newData.data;
    });
    watch(error, (newError) => {
        throw createError(newError);
    });
</script>