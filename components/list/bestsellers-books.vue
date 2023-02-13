<template>
    <div v-if="!loading && books.length"> 
        <h2>List of books:</h2>
        <div>
            <div v-for="(book, index) in books" :key="index">
                <h3>
                    <NuxtLink :to="'/bestsellers/books/' + book.primary_isbn">{{book.title}}</NuxtLink>
                </h3>
                <div :id="`book-img-${book.primary_isbn}`">
                </div>
                <div>
                    {{book.description}}
                </div>
                <div>
                    Author: {{book.author}}
                </div>
            </div>
        </div>
        <CommonPagination v-if="(lastPage > 1)" :links="links"/>
    </div>
    <div v-else>
        <p>List of books is loading...</p>
    </div>
</template>


<script setup>
const props = defineProps({
    listName: {
        type: String,
        required: true
    }
})

const loading = ref(true);
const route = useRoute();
const books = ref([]);
const links = ref([]);
const lastPage = ref(1);
const page = ref((route.query.page === undefined) ? 1 : route.query.page);
let baseURL = useBaseUrl();
const { data, error, pending, refresh } = await useLazyAsyncData(
    `bestsellers-list-${props.listName}-page${page.value}`, 
    () => $fetch(`/api/bestsellers/lists/${props.listName}?page=${page.value}`, {
        baseURL,
    }),
    { pick: ['data'] },
);

if (!pending.value) {
    refresh();
}

watch(error, (newError) => {
    throw createError(newError);
});

watch(data, async (newData) => {
    books.value = newData.data.data;
    links.value = newData.data.links;
    lastPage.value = newData.data.last_page;
    loading.value = false;

    if (!process.client) {
        return;
    }
    let results = await fetchBooksImages();
    results.forEach(res => {
        if (res.status !== "fulfilled") {
            return;
        }

        let aBook = res.value.data;
        if (aBook === null) {
            console.log(`aBook is null, isbn: ${aBook.isbn}`);
            return;
        }

        let imgLinks = aBook.imageLinks;
        if (imgLinks === undefined) {
            console.log(`imageLinks is undefined, isbn: ${aBook.isbn}`)
            return;
        }

        if (imgLinks.thumbnail === undefined) {
            console.log(`imgLinks.thumbnail is undefined, isbn: ${aBook.isbn}`);
            return;
        }
        
        let img = document.createElement('img');
        img.src = imgLinks.thumbnail;
        
        let imgContainer = document.getElementById(`book-img-${aBook.isbn}`);
        if (imgContainer === null) {
            console.log(`imgContainer is null, isbn: ${aBook.isbn}`);
            return;
        }
        imgContainer.appendChild(img);
    });
});

function fetchBooksImages() {
    let booksFetches = [];
    books.value.forEach(book => {
        if (book.primary_isbn === undefined || book.primary_isbn === "None") {
            return;
        }
        booksFetches.push(
            $fetch(`/api/bestsellers/books/${book.primary_isbn}`, {
                baseURL,
            })
        );
    });

    return Promise.allSettled(booksFetches);
}


</script>