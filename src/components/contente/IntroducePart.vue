<template>
  <div class="introduce__container">
    <div class="introduce__beckground">
      <div class="introduce__img">
        <img src="@/assets/img/eight_big_baner.jpg" alt="jpg" />
      </div>
      <div class="introduce__info">
        <p class="introduce__txt">
          {{ $t('introduce.title') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.introduce {
  // &__container {
  //   // background-color: black;
  // }

  // &__beckground {

  // }

  &__img {
    max-height: 1000px;
    overflow: hidden;
    img {
      // width: 100%;
      // height: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    display: flex;
    justify-content: center;
    color: #ffffff;
    padding: 30px 0;
  }

  &__txt {
    flex: 0 1 700px;
    font-size: 25px;
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
}
</style>
