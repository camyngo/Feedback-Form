<template>
  <form-group :validator="v" class="required" label="Email">
    <div class="styling" />
    <input
      v-model="email"
      type="email"
      class="input"
      required="required"
      placeholder="Please input your email address"
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
    email: {
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
