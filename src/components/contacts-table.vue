<template>
  <div :class="tableClass">

    <span
      class="table__item"
      :class="contactsClassCompute(index)"
      v-for="(item, index) in contacts"
      :key="index"
    >{{ contacts[index] }}</span>

  </div>
</template>

<script>
export default {
  props: {
    area: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      contacts: [
        'Контактный номер:',
        '8 (914) 201-05-30',
        'E-mail:',
        'stasy140186@mail.ru',
        'Instagram:',
        '@Anastasia_stasy_i'
      ]
    }
  },
  methods: {
    contactsClassCompute(index) {
      if(index % 2) {
        if(this.area == null) {
          return 'contacts__item__light';
        }
        return 'footer__contacts__item__light';
      }
      else {
        if(this.area) {
          return 'footer__contacts__item__bold'
        }
        return 'contacts__item__bold';
      }
    }
  },
  computed: {
    tableClass() {
      if(this.area) {
        return 'footer__contacts__table';
      }

      return 'contacts__table';

    }
  }
}
</script>

<style media="screen">
  .table__item {
    font-family: "Steppe";
  }
</style>
