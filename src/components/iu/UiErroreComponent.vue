<template>
  <div class="errore">
    <div class="errore__txt">Oops ERROR</div>
    <div class="errore__img"><img src="@/assets/img/errore_img.png" alt="png" /></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.errore {
  background-color: black;

  padding: 100px 0 0 0;

  &__txt {
    color: #fff;
    font-size: 40px;
    font-weight: 600;
    text-align: center;
  }

  &__img {
    height: 90vh;
    width: 90vw;
    overflow: hidden;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
