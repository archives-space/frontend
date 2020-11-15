<template>
  <v-footer
    dark
    padless
    class="mt-5 sticky-footer"
  >
    <v-card
      flat
      tile
      class="secondary lighten-1 white--text text-center"
      width="100%"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <Container>
          <v-row justify="center" no-gutters>
            <v-col cols="12" sm="12" md="8">
              <v-row no-gutters>
                <v-col
                  class="d-flex align-center"
                  cols="12"
                  sm="7"
                >
                  <p style="text-align:left; margin-bottom: 0;">
                    WikiArchives.space is a collaborative photo gallery aiming to host every single public domain and CC-NC space photos ever taken, and distribute it to everyone for free.

                    Each photo added is carefully and manually treated by an archivist, to make sure you get the date and location it was taken, an extensive description, and the source.
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                >
                  <v-row justify="center" class="mt-3 mt-md-0">
                    <v-col
                      cols="12"
                      lg="7"
                      md="8"
                      sm="11"
                      class="d-flex flex-column"
                    >
                      <v-btn
                        v-for="link in links"
                        :key="link.id"
                        color="white"
                        text
                        rounded
                        @click="openLink(link)"
                      >
                        {{ link.name }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </Container>
      </v-card-text>

      <v-divider />

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>WikiArchives.space</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import Container from '~/components/Container'

export default {
  name: 'Footer',
  components: {
    Container
  },
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-instagram',
      'mdi-github'
    ],
    links: [
      {
        id: 'about',
        name: 'About',
        url: '#internal#/about'
      },
      {
        id: 'contact-us',
        name: 'Contact us',
        url: 'https://github.com/archives-space/?future=api-docs'
      },
      {
        id: 'legals',
        name: 'Legals',
        url: 'https://github.com/archives-space/?future=api-docs'
      },
      {
        id: 'API',
        name: 'API Documentation',
        url: 'https://github.com/archives-space/?future=api-docs'
      }
    ]
  }),
  methods: {
    openLink (link) {
      if (link.url.includes('#internal#')) {
        this.$router.push(link.url.replace('#internal#', ''))
      } else {
        window.open(link.url, '_blank').focus()
      }
    }
  }
}
</script>
