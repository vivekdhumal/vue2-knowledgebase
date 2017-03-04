<template>
    <div id="app">
        <Message>
            Hello World!
        </Message>
        <Message>
            Another component
        </Message>
    </div>
</template>

<script>
    import Message from './components/Message.vue';

    export default {
      name: 'app',

      components: { Message },
  }
</script>

<style>
</style>
