<script setup>
import { computed, onMounted, ref } from 'vue'
import './App.css'

// This framework's own data layer: fetch its data at runtime.
// import.meta.env.BASE_URL keeps the path correct under the GitHub Pages
// project subpath (/vue/). The JSON uses the same shape the AutoCSS UI
// consumes, so a later stage can render this same data remotely.
const DATA_URL = `${import.meta.env.BASE_URL}data/records.json`

const records = ref([])
const status = ref('loading')

const record = computed(() => records.value[0])
const columns = computed(() =>
  record.value?.items?.length ? Object.keys(record.value.items[0]) : [],
)

onMounted(() => {
  fetch(DATA_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    })
    .then((data) => {
      records.value = data
      status.value = 'ready'
    })
    .catch(() => (status.value = 'error'))
})
</script>

<template>
  <main>
    <header>
      <h1>Vue data layer</h1>
      <p class="tag">
        A standard Vite&nbsp;+&nbsp;Vue instance rendering its own data
        &mdash; the back-end reference for the AutoCSS remote-rendering demo.
      </p>
    </header>

    <p v-if="status === 'loading'" role="status">Loading data&hellip;</p>
    <p v-else-if="status === 'error'" role="alert">Could not load data.</p>

    <article v-else-if="status === 'ready' && record">
      <h2>{{ record.title }}</h2>
      <p class="intro">{{ record.intro }}</p>
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in record.items" :key="item.id">
            <td v-for="column in columns" :key="column">{{ item[column] }}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </main>
</template>
