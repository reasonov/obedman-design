<template>
  <nav class="header__navigation">
    <ul class="header__navigation__list">
      <li>
        <a class="header__navigation__item" href="#">О компании</a>
      </li>
      <li>
        <router-link class="header__navigation__item" to="/projects">Проекты</router-link>
      </li>
      <li>
        <a class="header__navigation__item header__navigation__item--last" href="#">Контакты</a>
      </li>
    </ul>
    <div class="navigation__phone">
      <img src="../assets/images/Phone.png" alt="">
      <span class="navigation__number">8 (914) 201-05-30</span>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>
