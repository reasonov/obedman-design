<template>
  <div class="contacts__request">
    <h4 class="request__caption">Оставьте заявку <br> Мы с вами свяжемся</h4>
    <form class="request__form">

      <input
        class="request__input request__name"
        :class="requestInputList[index].class"
        :type="requestInputList[index].type"
        :placeholder="requestInputList[index].placeholder"
        v-for="(item, index) in requestInputList"
        :key="index"
      /><br>

      <button class="request__input request__submit" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestInputList: [
        {
          class: 'request__name',
          type: 'text',
          placeholder: 'Имя, Фамилия'
        },
        {
          class: 'request__phone',
          type: 'tel',
          placeholder: 'Телефон'
        },
        {
          class: 'request__comment',
          type: 'text',
          placeholder: 'Комментарии'
        }
      ]
    }
  }
}
</script>
