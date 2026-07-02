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
  <!-- Default AutoCSS Holy-Grail scaffold. <app-container id="app"> is the
       mount node in index.html, so the app renders its children directly
       here. The framework's own content-level elements live inside <article>. -->
  <app-banner></app-banner>
  <header>
    <app-logo></app-logo>
    <label>
      Layouts
      <input type="checkbox" checked />
    </label>
    <label aria-label="Light color scheme">
      &#9788; Light
      <input type="radio" aria-hidden="true" name="color-scheme" value="light" />
    </label>
    <label aria-label="Dark color scheme">
      &#9790; Dark
      <input type="radio" aria-hidden="true" name="color-scheme" value="dark" />
    </label>
    <label aria-label="System color scheme">
      &#9680; System
      <input type="radio" aria-hidden="true" name="color-scheme" value="system" checked />
    </label>
  </header>
  <nav>
    <details open>
      <summary></summary>
      <section>
        <label><input type="radio" aria-hidden="true" name="nav" value="manage" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="faqs" /></label>
      </section>
    </details>
    <details open>
      <summary></summary>
      <section>
        <label><input type="radio" aria-hidden="true" name="nav" value="api-registration" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="audit" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="option-set" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="option-types" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="scope-type" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="server-types" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="servers" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="credentials" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="variables" /></label>
        <label><input type="radio" aria-hidden="true" name="nav" value="settings" /></label>
      </section>
    </details>
  </nav>
  <main>
    <article>
      <h1>Vue data layer</h1>
      <p class="tag">
        A standard Vite&nbsp;+&nbsp;Vue instance rendering its own data
        inside the remote AutoCSS scaffold.
      </p>

      <p v-if="status === 'loading'" role="status">Loading data&hellip;</p>
      <p v-else-if="status === 'error'" role="alert">Could not load data.</p>

      <template v-else-if="status === 'ready' && record">
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
      </template>
    </article>
  </main>
  <aside>
    <h2 aria-live="polite">DETAILS</h2>
    <label role="button" aria-label="Close">
      <input type="checkbox" />
      &#10006;
    </label>
    <form>
      <fieldset></fieldset>
      <p aria-live="polite"></p>
      <small>Note: Ensure all fields are filled correctly before submitting.</small>
      <small>Note: All fields marked with * are required.</small>
      <label role="button" aria-label="Delete">
        Delete
        <input type="checkbox" />
      </label>
      <label role="button" aria-label="Reset">
        Reset
        <input type="checkbox" />
      </label>
      <label role="button" aria-label="Save">
        Save
        <input type="checkbox" />
      </label>
    </form>
  </aside>
  <footer>
    <app-legal></app-legal>
    <app-version></app-version>
  </footer>
  <app-banner></app-banner>
</template>
