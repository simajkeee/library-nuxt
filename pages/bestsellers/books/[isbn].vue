<template>
    <div v-if="!loading">
        <div>
            <button @click="$router.back()">Back to list</button>
        </div>
        <div v-if="book != null">
            <div>
                <h2>{{book.title}}</h2>
                <div><img :src="book.imageLinks.thumbnail"></div>
                <div>{{book.description}}</div>
                <div>Authors: {{ book.authors.join(', ') }}</div>
            </div>
            <div>
                <div id="viewerCanvas" style="width: 600px; height: 500px"></div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Book is loading...</p>
    </div>
</template>

<script setup>
    useHead({
        script: [
            {
                src: 'https://www.google.com/books/jsapi.js',
                defer: true,
                onload: () => {
                    jsapiloading.value = false;
                }
            }
        ]
    });
    const jsapiloading = ref(true);
    const loading = ref(true);
    const readyToRender = ref(false);
    const route = useRoute()
    const book = ref(null)
    const { data, error, pending, refresh } = await useLazyAsyncData(
        `book-detail-${route.params.isbn}`, 
        () => $fetch(`/api/bestsellers/books/${route.params.isbn}`, {baseURL: useBaseUrl()}), 
        { pick: ['data'] }
    );

    if (!pending.value) {
        refresh();
    }

    watch(error, (newError) => {
        throw createError(newError);
    });

    watch(data, (newData) => {
        loading.value = false;
        readyToRender.value = !loading.value && !jsapiloading.value;
        book.value = newData.data;
        if (!process.client) {
            return;
        }
    });

    watch(readyToRender, (ready) => {
        console.log("ready to render status", ready);
        if (!ready || !process.client) {
            return;
        }

        google.books.load();

        function initialize() {
            let canvas = document.getElementById('viewerCanvas');
            console.log(canvas);
            let viewer = new google.books.DefaultViewer(canvas);
            viewer.load(`ISBN:${route.params.isbn}`);
        }

        google.books.setOnLoadCallback(initialize);
    });
</script>
