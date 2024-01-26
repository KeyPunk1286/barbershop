<template>
  <div class="loading">
    <div class="loading__img">
      <img src="@/assets/img/img_spiner.png" alt="png" class="loading__rotate" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(168, 168, 168);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  &__img {
    flex: 0 1 150px;
    max-height: 150px;
    overflow: hidden;
  }
  &__rotate {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: rotate 2s linear infinite;
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
