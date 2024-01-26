<template>
  <div class="barber__container">
    <div class="barber__title">
      <h3>{{ $t('barberComponent.title') }}</h3>
    </div>
    <div class="barber__top-img">
      <div class="top-img__left-img"><img src="@/assets/img/twenty_three.jpg" alt="jpg" /></div>
      <div class="top-img__right-img"><img src="@/assets/img/fourteen.jpg" alt="jpg" /></div>
    </div>
    <div class="barber__middle">
      <div class="middle__big-pic"><img src="@/assets/img/twenty_two.jpg" alt="jpg" /></div>
    </div>
    <div class="barber__bottom">
      <div class="bottom__left-pic"><img src="@/assets/img/seven.jpg" alt="jpg" /></div>
      <div class="bottom__right-pic"><img src="@/assets/img/nineteen.jpg" alt="jpg" /></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.barber {
  &__container {
    padding: 40px 0;
    // background-color: black;
  }

  &__title {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    h3 {
      color: #ffff;
    }
  }

  &__top-img {
    display: flex;
    @media (max-width: 720px) {
      flex-direction: column;
    }
  }

  // &__middle {
  // }

  &__bottom {
    display: flex;
    @media (max-width: 720px) {
      flex-direction: column;
    }
  }
}
.top-img {
  &__left-img {
    flex: 0 1 50%;
    height: 80vh;
    overflow: hidden;
    @media (max-width: 600px) {
      height: 40vh;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__right-img {
    flex: 0 1 50%;
    height: 80vh;
    overflow: hidden;
    @media (max-width: 600px) {
      height: 40vh;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.middle {
  &__big-pic {
    width: 100%;
    height: 40vh;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.bottom {
  &__left-pic {
    flex: 0 1 50%;
    height: 80vh;
    overflow: hidden;
    @media (max-width: 600px) {
      height: 40vh;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__right-pic {
    flex: 0 1 50%;
    height: 80vh;
    overflow: hidden;
    @media (max-width: 600px) {
      height: 40vh;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
