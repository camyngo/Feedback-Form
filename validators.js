import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VuelidateErrorExtractor, {
  i18n: false,
  // Define common validation messages.
  messages: {
    required: '{attribute} is required!',
    email: '{attribute} is not a valid email address.',
    isEmailAvailable: '{attribute} is not available.'
  }
})

Vue.component('form-group', templates.singleErrorExtractor.bootstrap4)

export function isValid(value) {
  if (!value) return true
  return value
}

// if email is qualified then remove errors
export function isEmailAvailable(value) {
  if (value === '') return true

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value.length > 1)
    }, 500)
  })
}
