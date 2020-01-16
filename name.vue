<template>
  <form-group :validator="v" class="required" label="Name  ">
    <div class="styling" />
    <input
      v-model="name"
      type="text"
      class="input"
      required="required"
      placeholder="Please input your name"
      @blur="v.$touch()"
    />
  </form-group>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: true
    }
  },
  computed: {
    name: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
<style scoped lang="less">
@import '../../assets/styles/feedback.less';
.input {
  padding: 0.8rem;
}

.styling {
  padding-bottom: 6px;
}
</style>
