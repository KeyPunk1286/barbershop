<template>
  <div class="contacts">
    <div class="contacts__title">
      <h3>{{ $t('contactComponent.title') }}</h3>
    </div>
    <div class="contacts__info">
      <div class="info__time">{{ $t('servicesComponent.work') }}</div>
      <div class="info__work">10:00 - 21:00 ({{ $t('servicesComponent.time') }})</div>
    </div>
    <div class="contacts__adress">
      <div class="info__street">{{ $t('servicesComponent.street') }}, 6</div>
      <div class="info__number">+380953452028</div>
    </div>
    <div class="contacts__map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1892.6994347771767!2d35.10778948532837!3d47.86513694205139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1706184654073!5m2!1sru!2sua"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.contacts {
  padding: 40px 0;

  &__title {
    padding: 20px;
    background-color: black;
    color: #ffffff;
    text-align: center;
    margin-bottom: 100px;
  }

  &__info {
    text-align: center;
    margin-bottom: 50px;
  }

  &__adress {
    text-align: center;
    margin-bottom: 100px;
  }

  &__map {
    iframe {
      width: 100vw;
      height: 50vh;
    }
  }
}
.info {
  &__time {
    line-height: 1.4;
    font-weight: 700;
  }

  &__work {
    line-height: 1.4;
  }

  &__street {
    line-height: 1.4;
  }

  &__number {
    line-height: 1.4;
  }
}
</style>
