<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
    >
      <v-list dense>
        <template v-for="(module, index) in nav">
          <v-list-group
            v-if="module.subNav !== false"
            no-action
            :key="index + '1'"
            :prepend-icon="module.icon"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ module.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="subItem in module.subNav"
              :key="subItem.id"
              :data="subItem"
              :to="subItem.indexRoute"
              ripple
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ subItem.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-if="module.subNav === false"
            :key="index + '2'"
            :to="module.indexRoute"
            ripple
            exact>
            <v-list-item-action>
              <v-icon>{{ module.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ module.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <SnackbarsStack ref="snackbarsStack" />
  </v-app>
</template>

<script>
import SnackbarsStack from '~/components/SnackbarsStack.vue'

export default {
  name: 'BackOfficeLayout',
  components: {
    SnackbarsStack
  },
  data: () => ({
    drawer: null,
    nav: [
      {
        title: 'Dashboard',
        icon: 'mdi-home',
        indexRoute: '/backoffice',
        subNav: false
      },
      {
        title: 'Users',
        icon: 'mdi-account-circle',
        indexRoute: '/backoffice/users',
        subNav: false
      }
      // {
      //   title: 'Games',
      //   icon: 'mdi-store',
      //   subNav: [
      //     { title: 'Games', indexRoute: '/backoffice' },
      //     { title: 'Editors', indexRoute: '/backoffice' },
      //     { title: 'Tags', indexRoute: '/backoffice' },
      //     { title: 'Platforms', indexRoute: '/backoffice' }
      //   ]
      // }
    ]
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  mounted () {
    this.$setSnackbars(this.$refs.snackbarsStack)
  },
  metaInfo () {
    return {
      title: this.$store.state.title
    }
  }
}
</script>
