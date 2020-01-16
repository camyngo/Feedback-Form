<template>
  <div class="vex-custom-field-wrapper">
    <div class="vex-custom-input-wrapper type">
      <name-vuelidate v-model="form.name" :v="$v.form.name" @input="userName" />
      <div style="padding-bottom: 16px;" />
      <email-vuelidate v-model="form.email" :v="$v.form.email" @input="userEmail" />
      <div />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import { isValid, isEmailAvailable } from './validators'
import NameComponent from './name.vue'
import EmailComponent from './email.vue'

export default {
  name: 'FeedbackForm',
  components: {
    'name-vuelidate': NameComponent,
    'email-vuelidate': EmailComponent
  },
  data() {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState({
      //getting the user data from the mapstate
      user: state => state.auth.user
    })
  },
  created() {
    /*auto fill name and email if user is log in*/
    if (this.user.firstName && this.user.lastName) {
      this.form.name = this.user.firstName + ' ' + this.user.lastName
      this.$emit('Name', this.form.name)
    }
    if (this.user.email) {
      this.form.email = this.user.email
      this.$emit('Email', this.form.email)
    }
  },
  methods: {
    userName: function() {
      this.$emit('Name', this.form.name)
    },
    userEmail: function() {
      this.$emit('Email', this.form.email)
    }
  },
  validations: {
    form: {
      name: { required, isValid },
      email: { required, email, isEmailAvailable }
    }
  }
}
</script>
<style scoped lang="less">
.input {
  .hasError & {
    border-color: red;
  }
}

.hasError label {
  color: red;
}
</style>
