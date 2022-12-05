<template>
    <div>
        <div>
            <button @click="$router.back()">Back to list</button>
        </div>
        <div v-if="book != null">
            <h2>{{book.title}}</h2>
            <div><img :src="book.imageLinks.thumbnail"></div>
            <div>{{book.description}}</div>
            <div>Authors: {{ book.authors.join(', ') }}</div>
        </div>
        <div v-if="book != null">
            <div id="viewerCanvas" style="width: 600px; height: 500px"></div>
        </div>
    </div>
</template>

<script setup>
        
        const route = useRoute()
        useHead({
            script: [
                {
                    type: 'text/javascript',
                    children: `
                    document.addEventListener("DOMContentLoaded", function(){
                        google.books.load();

                        function initialize() {
                            var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
                            viewer.load('ISBN:${route.params.isbn}');
                        }

                        google.books.setOnLoadCallback(initialize);
                    });
                    `
                },
            ]
        });

        const book = ref(null)
        const { data, error } = await useAsyncData(
            `book-detail-${route.params.isbn}`, 
            () => $fetch(`http://api.books.com:8000/api/bestsellers/books/${route.params.isbn}`), 
            { pick: ['data'] }
        )

        if (!error.value) {
            book.value = data.value.data;
        }
</script>
