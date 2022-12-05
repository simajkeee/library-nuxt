<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  useHead({
    script: [
        {
            src: "https://www.google.com/books/jsapi.js",
            type: "text/javascript",
        },
    ]
  });
</script>
