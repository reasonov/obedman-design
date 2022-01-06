<template>
  <div class="home-page">
    <div class="header__content">
      <div class="header__content__wrapper">
        <h2 class="header__caption header__caption--light">Строим</h2>
        <h1 class="header__caption header__caption--bold">Квартиру мечты</h1>
        <h2 class="header__caption header__caption--light">В Хабаровске</h2>
        <router-link tag="button" class="header__button__projects" to="/projects">Наши проекты</router-link>
      </div>
    </div>


    <section class="container about-us">
      <div class="about-us__text-wrapper">
        <h3 class="section__caption about-us__caption">О компании</h3>
        <p class="about-us__text">
          Мы были созданы в 9000г до н.э. за это время мы успели построить пирамиды, стоунхэндж,
          храсы зевсу, артемиде, башни близницов, для нас самое важное комфорт и практичность
          идей строительства в Хабаровске.
        </p>
        <button class="about-us__button" @click.stop>Узнать больше</button>
      </div>
      <div class="image1"></div>
    </section>

    <section class="container projects">
      <h3 class="section__caption projects__caption">Наши проекты</h3>
      <span class="projects__text">Задумка и реализация</span>

      <projects-slider />

      <router-link tag="button" class="project__button" to="projects" @click.stop>Смотреть больше</router-link>
    </section>

    <div class="our-achievements">
      <div class="our-achievements__wrapper">
        <h3 class="section__caption achievements__caption">Наши достижения</h3>
        <span class="achievements__text">Задумка и реализация</span>
        <div class="achievements__list">

          <article class="achievements__item" v-for="(item, index) in 3" :key="index">
            <span class="achievements__item__stats">{{ achivements[index].stats }}</span>
            <span class="achievements__item__description">{{ achivements[index].description }}</span>
          </article>

        </div>
      </div>
    </div>

    <section class="container work-stages">
      <div class="work-stages__wrapper">
        <h3 class="section__caption work-stages__caption">Простые шаги до квартиры вашей мечты</h3>
        <div class="work-stages__lists">
          <div class="work-stages__disign-wrapper">
            <h4 class="work-stages__list__caption disign__caption">Дизайн-проект</h4>
            <ul class="work-stages__list disign__list">

              <li class="work-stages__item disign__item" v-for="(item, index) in workStagesDisign" :key="index">{{ index + 1 }}. {{ item }}</li>

            </ul>
          </div>
          <div class="work-stages__building-wrapper">
            <h4 class="work-stages__list__caption building__caption">Строительство</h4>
            <ul class="work-stages__list building__list">

              <li class="work-stages__item building__item" v-for="(item, index) in workStagesBuilding" :key="index">{{ index + 1 }}. {{ item }}</li>

            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="container contacts">
      <div class="our-contacts">
        <h3 class="section__caption">Контакты</h3>

        <contacts-table />

      </div>

      <request-block />

    </section>
  </div>
</template>

<script>
import projectsSlider from '../components/projects-slider.vue';
import requestBlock from '../components/request-block.vue';
import contactsTable from '../components/contacts-table.vue';

export default {
  components: {
    projectsSlider: projectsSlider,
    requestBlock: requestBlock,
    contactsTable: contactsTable
  },
  data() {
    return {
      achivements: [
        {
          stats: 10,
          description: 'Лет на рынке'
        },
        {
          stats: 'Есть',
          description: 'Высшее образование'
        },
        {
          stats: 218,
          description: 'Сделанных проектов'
        }
      ],
      workStagesDisign: [
        'Планировочное решение',
        'Чертежи и подбор отделочных материалов',
        'Авторский надзор'
      ],
      workStagesBuilding: [
        'Тендер строительных компаний',
        'Координация субподрядчиков',
        'Стройка и отслеживание реализации',
        'Архитектурный надзор'
      ]
    }
  }
}
</script>

<style src="../assets/css/home-page.css"></style>
<style src="../assets/css/home-page-mobile.css"></style>
<style src="../assets/css/home-page-middle.css"></style>
