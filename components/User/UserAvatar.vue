<template>
  <div>
    <v-card>
      <v-card-title>
        Edit your avatar
      </v-card-title>
      <v-card-text class="d-flex justify-center">
        <v-avatar
          size="200"
          style="border: 2px solid #95a5a6"
        >
          <v-img :src="user.avatar.url" />
        </v-avatar>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          min-width="110px"
          @click="$refs.avatarEditor.toggle()"
        >
          Change avatar
        </v-btn>
      </v-card-actions>
    </v-card>
    <AvatarEditor
      ref="avatarEditor"
      rounded
      :loading="formLoading"
      @submitted="handleAvatarEditorSubmitted"
    />
  </div>
</template>

<script>
import AvatarEditor from '~/components/AvatarEditor'

export default {
  name: 'UserAvatar',

  components: { AvatarEditor },

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    formLoading: false,
    validateAvatar: false
  }),

  methods: {
    handleAvatarEditorSubmitted (blob) {
      const form = new FormData()
      form.append('avatar', blob, blob.filename)
      this.formLoading = true
      this.$http.post('/users/' + this.user.id + '/avatar', form).then(async res => {
        const data = await res.json()
        this.formLoading = false
        this.user.avatar = data.data.avatar
        //this.$store.commit('SET_DATA', { thumbnail: res.data.thumbnail })
        this.$refs.avatarEditor.finish()

        this.$snackbars().add({ color: 'success', text: 'Avatar updated!' })
      }).catch(err => {
        console.log(err)
        this.formLoading = false
        this.$snackbars().add({ color: 'error', text: 'API Request error' })
      })
    }
  }
}
</script>
