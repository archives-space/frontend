<template>
  <div>
    <template
      v-for="(role, index) in roles"
    >
      <v-chip
        v-if="role != 'ROLE_USER'"
        :key="index"
        class="mr-2"
        :color="roleColor(role)"
      >
        {{ role|roleHuman }}
      </v-chip>
    </template>
  </div>
</template>

<script>
export default {
  filters: {
    roleHuman (v) {
      const role = (v.split('_')[1]).toLowerCase()
      return role[0].toUpperCase() + role.slice(1)
    }
  },
  props: {
    roles: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    roleColor (role) {
      switch (role) {
        case 'ROLE_CONFIRMED':
          return 'green'
        case 'ROLE_MODERATOR':
          return 'purple'
        case 'ROLE_ADMIN':
          return ''
        case 'ROLE_DEVELOPER':
          return 'primary'
        default:
          return ''
      }
    }
  }
}
</script>
