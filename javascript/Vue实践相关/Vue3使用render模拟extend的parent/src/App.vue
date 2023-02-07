<template>
  <div v-lightbox>
    <h1>
      Automatic Lightbox <br />
      on images in v-html
    </h1>
    <div v-html="content"></div>
  </div>
</template>

<script>
export default {
  setup() {
    const content = `
        <p>hello</p>
        <img src="https://via.placeholder.com/400" />
    `;

    return { content };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
