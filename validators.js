<template>
  <form v-if="showPrimary" id="feedback-form" @submit.prevent="submitForm">
    <transition :name="'fade'">
      <modal
        v-if="showPrimary"
        :heading="formHeader"
        :dismiss="[toggleModal, 'NEVERMIND']"
        :submit="'SEND'"
      >
        <div class="vex-dialog-form">
          <div class="vex-dialog-input">
            <my-input @Name="userName" @Email="userEmail" />
            <!-- Making the headline invisible and the required set for correct validation when sending form -->
            <div v-show="isHidden" class="vex-custom-field-wrapper">
              <div class="vex-custom-input-wrapper type">
                <label class="required" for="headline">Headline</label>
                <input
                  v-model="formData.headline"
                  class="input"
                  name="headline"
                  type="text"
                  required="required"
                />
              </div>
            </div>

            <div v-for="t in types" :key="t" class="type">
              <label>
                <input v-model="formData.type" type="radio" :value="t" @click="toggleType(t)" />
                {{ t }}
              </label>
            </div>

            <transition mode="out-in" name="fade">
              <div v-if="showAskDelivery" class="type">
                <div style="padding-bottom: 16px;" />
                <label>How are you accessing the content?</label>
                <div v-for="dt in deliveryTypes" :key="dt">
                  <label>
                    <input
                      v-model="formData.delivery"
                      type="radio"
                      :value="dt"
                      @click="toggleDelivery(dt)"
                    />
                    {{ dt }}
                  </label>
                </div>
              </div>
            </transition>

            <!-- REPORT A PROBLEM -->
            <transition mode="out-in" name="fade">
              <div v-if="showReportProblem" key="problem" class="feedback-type">
                <div class="platform">
                  <label v-if="checkCable" class="type">Provider</label>
                  <label v-if="!checkCable" class="type">Platform</label>
                  <div class="column type">
                    <div v-for="p in platforms" :key="p">
                      <label>
                        <input
                          v-model="formData.platform"
                          type="radio"
                          name="platform-2"
                          :value="p"
                          @click="platform(p)"
                        />
                        {{ p }}
                      </label>
                    </div>
                    <input
                      v-if="checkOther"
                      class="other"
                      required="required"
                      @input="handleInput($event.target.value)"
                    />
                  </div>

                  <transition mode="out-in" name="fade">
                    <div class="type">
                      <div class="styling" />
                      <label>Your Region</label>
                      <div class="column">
                        <div v-for="r in regions" :key="r">
                          <label>
                            <input
                              v-model="formData.region"
                              type="radio"
                              :value="r"
                              @click="region(r)"
                            />
                            {{ r }}
                          </label>
                        </div>
                        <input
                          v-if="checkRegion"
                          class="other"
                          required="required"
                          @input="handleInput2($event.target.value)"
                        />
                      </div>
                    </div>
                  </transition>

                  <div class="vex-custom-field-wrapper">
                    <div class="vex-custom-input-wrapper type">
                      <label>Please select a problem</label>
                      <select v-model="formData.problemType">
                        <option v-for="ci in commonIssues" :key="ci" :value="ci">{{ ci }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="vex-custom-field-wrapper">
                    <div class="vex-custom-input-wrapper type">
                      <label>Please provide a description</label>
                      <textarea
                        v-model="formData.message"
                        autocapitalize="sentences"
                        rows="6"
                        cols="68.5"
                      />
                    </div>
                  </div>
                  <div class="vex-custom-field-wrapper">
                    <div class="vex-custom-input-wrapper type">
                      <label>Rate BYUtv</label>
                      <star-rating
                        :show-rating="false"
                        :star-size="40"
                        :increment="1"
                        @rating-selected="setRating"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <!-- END OF REPORT A PROBLEM -->

            <!-- MAKE A SUGGESTION -->
            <transition mode="out-in" name="fade">
              <div v-if="showMakeSuggestion" key="suggest" class="feedback-type">
                <div class="platform">
                  <label v-if="checkCable" class="type">Provider</label>
                  <label v-if="!checkCable" class="type">Platform</label>
                  <div class="column type">
                    <div v-for="p in platforms" :key="p">
                      <label>
                        <input
                          v-model="formData.platform"
                          type="radio"
                          name="platform-2"
                          :value="p"
                          @click="platform(p)"
                        />
                        {{ p }}
                      </label>
                    </div>
                    <input
                      v-if="checkOther"
                      class="other"
                      required="required"
                      @input="handleInput($event.target.value)"
                    />
                  </div>

                  <div class="vex-custom-field-wrapper">
                    <div class="vex-custom-input-wrapper type">
                      <label>Please provide a suggestion</label>
                      <textarea
                        v-model="formData.message"
                        autocapitalize="sentences"
                        rows="3"
                        cols="68.5"
                      />
                    </div>
                  </div>
                  <div class="vex-custom-field-wrapper">
                    <div class="vex-custom-input-wrapper type">
                      <label>Rate BYUtv</label>
                      <star-rating
                        :show-rating="false"
                        :star-size="40"
                        :increment="1"
                        @rating-selected="setRating"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <!-- END OF MAKE A SUGGESTION -->
            <div style="padding-bottom: 16px;" />
          </div>
        </div>
      </modal>
    </transition>
  </form>
  <span v-else>
    <transition :name="'fade'">
      <modal v-if="!showPrimary" :action="[hideSecondary, 'CLOSE']">
        Thank you for your feedback. A development story has been created. This message will
        automatically close in 10 seconds.
      </modal>
    </transition>
  </span>
</template>

<script>
import StarRating from 'vue-star-rating'
import Input from '../feedback/input.vue'
const cable = 'Cable/Satellite/Antenna'

export default {
  name: 'FeedbackForm',
  components: {
    'star-rating': StarRating,
    'my-input': Input
  },
  props: { toggleModal: Function },
  data: function() {
    return {
      correspondentName: '',
      correspondentEmail: '',
      isHidden: false,
      showPrimary: true,
      timeoutToClear: null,
      formHeader: 'Please provide your feedback below for byutv.org:',
      formData: {
        delivery: '',
        problemType: '',
        platform: 'WEB',
        region: '',
        inputPlatform: '',
        inputRegion: '',
        message: '',
        category: 'TECHNICAL',
        dislike: '',
        headline: '',
        like: '',
        location: '',
        screenResolution: '',
        userAgent: ''
      },
      types: ['Report a Problem', 'Make a Suggestion'],
      deliveryTypes: [cable, 'Internet Stream'],
      regions: ['US', 'Canada', 'Other'],
      ipPlatforms: ['Web', 'Roku', 'FireTV', 'AppleTV', 'Android', 'iOS', 'XBox', 'Other'],
      broadcastPlatforms: [
        'Dish',
        'DirectTV',
        'Comcast',
        'Cox',
        'Time Warner',
        'Over the air',
        'Other'
      ],
      commonIssues: [
        'It aint workin',
        'I kicked it and it stopped workin',
        'I threw it across the room and it stopped working',
        'I dropped a mother panda on it and it stopped working',
        'Other'
      ]
    }
  },
  computed: {
    /*checking for the return of delivery*/
    checkCable() {
      if (this.formData.delivery === cable) return true
      else return false
    },
    checkOther() {
      if (this.formData.platform === 'Other') return true
      else return false
    },
    checkRegion() {
      if (this.formData.region === 'Other') return true
      else return false
    },
    dialogClass() {
      return (
        (this.showReportProblem
          ? 'report'
          : this.showMakeSuggestion
          ? 'suggest'
          : this.showAskDelivery
          ? 'delivery'
          : '') + (this.formData.delivery === cable ? ' region' : '')
      )
    },
    contentClass() {
      return 'content ' + this.dialogClass
    },
    showReportProblem() {
      return this.formData.type === 'Report a Problem' && this.formData.delivery !== ''
    },
    showMakeSuggestion() {
      return this.formData.type === 'Make a Suggestion' && this.formData.delivery !== ''
    },
    showAskDelivery() {
      return this.formData.type !== undefined
    },
    platforms() {
      return this.formData.delivery === cable
        ? this.broadcastPlatforms
        : this.formData.delivery === 'Internet Stream'
        ? this.ipPlatforms
        : []
    }
  },
  created() {
    /*declaring constant variable to passing data automatically to headline*/
    this.typeconstant, this.deliverconstant, this.platformconstant, this.regionform
  },
  methods: {
    userName(value) {
      this.correspondentName = value
    },
    userEmail(value) {
      this.correspondentEmail = value
    },
    setRating: function(rating) {
      this.rating = rating
    },
    hideSecondary() {
      clearTimeout(this.timeoutToClear)
      this.toggleModal()
    },
    handleInput(value) {
      this.inputPlatform = value
      this.updateHeadline()
      value = ''
    },
    handleInput2(value) {
      this.inputRegion = value
      this.updateHeadline2()
      value = ''
    },
    region(type) {
      this.regionform = type
      this.updateHeadline2()
    },
    platform(type) {
      this.platformconstant = type
      this.updateHeadline()
    },
    toggleDelivery(type) {
      this.formData.platform = ''
      this.formData.headline = this.typeconstant + ' - ' + type
      this.deliverconstant = type
    },
    toggleType(type) {
      this.formData.headline = type
      this.formData.region = ''
      this.formData.message = ''
      this.typeconstant = type

      // IF MAKE A SUGGESTION, CHANGE THE TYPE OF CATEGORY
      if (type === 'Make a Suggestion') {
        this.formData.category = 'STATION'
      }
    },
    submitForm(event) {
      event.preventDefault()
      let width = screen.availWidth
      let height = screen.availHeight
      const submitData = {
        correspondentName: this.correspondentName,
        correspondentEmail: this.correspondentEmail,
        platform:
          this.formData.delivery === 'Internet Stream'
            ? this.formData.platform.toUpperCase()
            : 'OTHER',
        location: window.location.href,
        userAgent: navigator.userAgent,
        screenResolution: width + 'X' + height,
        category: this.formData.category,
        Like: '',
        dislike:
          this.formData.category === 'STATION'
            ? 'Suggestion : ' + this.formData.message
            : 'Problems: ' + this.formData.problemType + ' - Description: ' + this.formData.message,
        rating: this.rating,
        headline: this.formData.headline
      }

      this.$store.dispatch('auth/GIVE_FEEDBACK', submitData)
      this.showPrimary = false
      this.timeoutToClear = setTimeout(this.toggleModal, 10000)
    },
    /*update headline for platform and provider*/
    updateHeadline() {
      this.formData.headline =
        this.typeconstant + ' - ' + this.deliverconstant + ' - ' + this.platformconstant

      if (this.inputPlatform && this.platformconstant === 'Other') {
        this.formData.headline += ': ' + this.inputPlatform
      }
    },
    /*update headline for region*/
    updateHeadline2() {
      this.updateHeadline()
      this.formData.headline = this.formData.headline + ' - ' + this.regionform

      if (this.inputRegion && this.regionform === 'Other') {
        this.formData.headline += ': ' + this.inputRegion
      }
    }
  }
}
</script>

<style lang="less">
/*form css style*/
@import '../../assets/styles/feedback.less';
.platform {
  padding-top: 16px;
}
.styling {
  padding-bottom: 16px;
}
</style>
