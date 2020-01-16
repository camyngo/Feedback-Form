<template>
  <div class="background" @click="backgroundDismiss">
    <div :id="heading ? 'modal-large' : ''" class="modal">
      <header v-if="heading" class="heading bottom-margin">{{ heading }}</header>
      <div :class="{ 'message-large': heading }" class="message">
        <slot />
      </div>
      <div
        :class="{ heading: heading }"
        class="options"
        style="background-color: #eaeaea;
    padding: 10px;"
      >
        <button
          v-if="dismiss"
          class="app-button app-button-big"
          :class="switchcolors ? 'app-button-blue' : 'app-button-grey'"
          data-test="dismiss-button"
          @click.prevent="dismiss[0]"
        >
          {{ dismiss[1] }}
        </button>
        <button
          v-if="action"
          type="heading ? 'submit' : ''"
          class="app-button app-button-big"
          :class="switchcolors ? 'app-button-grey' : 'app-button-blue'"
          data-test="action-button"
          @click="action[0]"
        >
          {{ action[1] }}
        </button>
        <button
          v-if="submit"
          type="submit"
          class="app-button app-button-blue app-button-big"
          data-test="action-button"
        >
          {{ submit }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: { dismiss: Array, action: Array, heading: String, switchcolors: Boolean, submit: String },
  methods: {
    backgroundDismiss(event) {
      if (event.target.className === 'background') {
        this.dismiss[0]()
      }
    }
  }
}
</script>

<style scoped lang="less">
@import (reference) url('../../assets/styles/variables/breakpoints');
@import (reference) url('../../assets/styles/variables/colors');
.background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  //the transfom property might fix the ios issue. I have no way of knowing for sure.
  -webkit-transform: translate3d(0, 0, 0);
  z-index: 100000;
  .modal button.app-button {
    margin-left: 0.7rem;
  }
}

.modal {
  background: #fff;
  color: #444;
  padding: 1em;
  position: relative;
  margin: auto;
  margin-top: 150px;
  max-width: 90%;
  width: 450px;
  font-size: 1.1em;
  line-height: 1.5em;
}
.message {
  text-align: left;
  max-height: 800px;
}
.message-large {
  overflow-y: auto;
  position: relative;
}
.options {
  text-align: right;
}
.heading {
  background-color: @primary-black-opaque;
  padding: 20px;
  color: #fff;
}
.bottom-margin {
  padding: 25px;
}
#modal-large {
  border-radius: 5px;
  width: 80%;
  max-height: 800px;
  padding: 0px;
  overflow: hidden;
  max-width: 80.8rem;
  display: flex;
  flex-direction: column;
  background-color: @primary-gray-lighter;
  .options.heading {
    width: 100%;
    background-color: @primary-black-opaque;
    bottom: 0;
  }
  .message {
    margin-top: 0px;
    max-height: none;
  }
}
header {
  text-align: center;
}
@media (max-width: 2560px) {
  .modal {
    margin-top: 60px;
  }
  #modal-large {
    width: 50%;
    max-height: 85%;
  }
}

@media (max-width: @breakpoint-lg) {
  .modal {
    margin-top: 45px;
  }
  #modal-large {
    width: 90%;
    max-height: 95%;
  }
}

@media (max-width: @breakpoint-sm) {
  #modal-large {
    max-height: none;
    max-width: none;
    width: 100%;
    margin-top: 0px;
    border-radius: 0px;
    height: 100%;
  }
}
</style>
