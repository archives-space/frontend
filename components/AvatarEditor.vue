<template>
  <v-dialog
    v-model="enabled"
    :max-width="modalSize"
  >
    <v-card>
      <v-card-title>
        {{ caption }}
      </v-card-title>
      <v-card-text>
        <v-layout justify-center class="mb-4">
          <div
            :class="rounded ? 'rounded' : ''"
            class="canvas-container"
          >
            <croppa
              ref="croppa"
              v-model="plugin"
              canvas-color="transparent"
              accept="image/jpeg,image/png"
              placeholder="Choose an image"
              :placeholder-color="$vuetify.theme.dark ? 'white' : 'black'"
              prevent-white-space
              :width="width"
              :height="height"
              :show-remove-button="false"
              :initial-image="imageUrl"
              :placeholder-font-size="22"
              @file-size-exceed="handleFileSizeExceed"
              @file-type-mismatch="handleFileTypeMismatch"
            />
          </div>
        </v-layout>
        <v-layout justify-center>
          <v-btn
            class="mr-2"
            dark
            outlined
            color="indigo"
            @click="rotate()"
          >
            <v-icon>mdi-rotate-right</v-icon>
          </v-btn>
          <v-btn
            class="mr-2"
            dark
            outlined
            color="indigo"
            @click="rotate(-1)"
          >
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>
          <v-btn
            dark
            outlined
            color="purple"
            @click="clear"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text min-width="6em"
          color="error"
          @click="toggle"
        >
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          text min-width="6em"
          :loading="loading"
          color="primary"
          @click="submit"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import 'vue-croppa/dist/vue-croppa.css'

export default {
  name: 'AvatarEditor',
  props: {
    caption: {
      type: String,
      default: 'Edit your avatar'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    modalSize: {
      type: Number,
      default: 500
    },
    imageUrl: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    enabled: false,
    plugin: {}
  }),
  methods: {
    toggle () {
      this.enabled = !this.enabled
      this.$nextTick(() => {
        if (this.enabled) {
          this.$refs.croppa.refresh()
        }
      })
    },
    clear () {
      this.plugin.remove()
    },
    rotate (x) {
      this.plugin.rotate(x)
    },
    submit () {
      this.plugin.generateBlob(
        blob => {
          this.$emit('submitted', blob)
        },
        'image/jpeg',
        1
      )
    },
    finish () {
      this.plugin.remove()
      this.enabled = false
    },
    handleFileSizeExceed () {
      this.$store.commit('ADD_ALERT', {
        color: 'error',
        text: 'This file is too big!'
      })
    },
    handleFileTypeMismatch () {
      this.$store.commit('ADD_ALERT', {
        color: 'error',
        text: 'This file is not an image!'
      })
    }
  }
}
</script>

<style>
  .croppa-container {
    background: transparent !important;
  }
  .canvas-container {
    line-height: 0;
  }
  .canvas-container canvas {
    border: 1px solid #bdc3c7;
  }
  /* .rounded-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    background-color: rgba(189, 195, 199, 0.5);
  } */
  .canvas-container.rounded .croppa-container canvas {
    border-radius: 50% !important;
  }
  @media screen and (max-width: 959px) {
    .canvas-container canvas {
      width: 100% !important;
      height: auto !important;
    }
  }
</style>
