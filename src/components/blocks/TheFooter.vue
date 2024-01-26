<template>
  <div class="footer__container">
    <div class="footer__box">
      <button @click="setLocale('ua')" class="footer__ua">ua</button>
      <a @click="scrollToSection('hdr')" href="#hdr">
        <img src="@/assets/img/img_logo_two.jpg" alt="jpg" class="footer__logo" />
      </a>
      <button @click="setLocale('en')" class="footer__en">en</button>
    </div>
  </div>
</template>

<script setup>
//==== import helperPlugin
import { useLocales } from '@/modulesHalpers/i18n'
const { setLocale } = useLocales()
//==== computed
//==== methods
function scrollToSection(section) {
  const targetElement = document.getElementById(section)
  if (targetElement) {
    const targetPosition = targetElement.offsetTop
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 1000
    let start = null

    const animateScroll = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start

      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration))

      if (progress < duration) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }
}

// Функція для роботи зі згладжуванням анімації
function easeInOutCubic(t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t * t + b
  t -= 2
  return (c / 2) * (t * t * t + 2) + b
}
</script>

<style lang="scss" scoped>
.footer {
  &__container {
    padding: 40px 0;
    display: flex;
    justify-content: center;
    // background-color: black;
  }

  &__box {
    display: flex;
    align-items: center;
    column-gap: 40px;
    font-size: 20px;
    font-weight: 600;
  }

  &__ua {
    color: #fff;
    transition: color 0.4s;
    @media (hover: hover) {
      &:hover {
        color: #aa9a9abc;
      }
    }
  }

  &__logo {
    border-radius: 50%;
  }

  &__en {
    color: #fff;
    transition: color 0.4s;
    @media (hover: hover) {
      &:hover {
        color: #aa9a9abc;
      }
    }
  }
}
</style>
