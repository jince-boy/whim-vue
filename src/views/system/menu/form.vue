<script setup lang="ts">

</script>

<template>
  <n-radio-group v-model:value="value" name="radiobuttongroup1">
    <n-radio-button
      v-for="song in songs"
      :key="song.value"
      :value="song.value"
      :disabled="
          (song.label === 'Live Forever' && disabled1)
            || (song.label === 'Shakermaker' && disabled2)
        "
      :label="song.label"
    />
  </n-radio-group>
</template>

<style scoped lang="scss"></style>
