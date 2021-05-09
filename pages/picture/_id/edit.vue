<template>
  <Container>
    <h2 class="display-1 mb-5 ml-4">
      Edit a picture
    </h2>
    <v-card>
      <v-tabs
        v-model="tab" centered
        tile
        background-color="transparent"
      >
        <v-tab>General</v-tab>
        <v-tab>Position</v-tab>
        <v-tab>Date</v-tab>
        <v-tab>License</v-tab>
        <v-tab>Exif</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <!-- General -->
        <v-tab-item>
          <v-card-text>
            <!--            <v-btn-->
            <!--              color="primary" outlined-->
            <!--              class="mb-5"-->
            <!--              @click="openCatalogPicker"-->
            <!--            >-->
            <!--              <v-icon left>-->
            <!--                mdi-file-tree-->
            <!--              </v-icon>-->
            <!--              Pick catalog-->
            <!--            </v-btn>-->
            <v-text-field
              v-model="picture.path"
              label="Parent catalog"
              @click="openCatalogPicker"
            />
            <v-text-field
              v-model="picture.version.name"
              label="Name"
            />
            <v-text-field
              v-model="picture.version.shortDescription"
              label="Short description"
            />
            <v-textarea
              v-model="picture.version.description"
              label="Description"
            />
          </v-card-text>
        </v-tab-item>
        <!-- Position -->
        <v-tab-item>
          <v-card-text>
            <position-picker
              class="mt-3"
              style="height: 60vh"
            />
          </v-card-text>
        </v-tab-item>
        <!-- Date -->
        <v-tab-item>
          <v-card-text>
            <HistoricalDatePicker />
          </v-card-text>
        </v-tab-item>
        <!-- License -->
        <v-tab-item>
          <v-card-text>
            <v-text-field
              v-model="picture.version.license.name"
              label="License"
            />
            <v-text-field
              v-model="picture.version.license.modified"
              label="Was the picture modified?"
            />
          </v-card-text>
        </v-tab-item>
        <!-- EXIF -->
        <v-tab-item>
          <v-card-text>
            <v-text-field
              v-model="picture.version.exif.manufacturer"
              label="Manufacturer"
            />
            <v-text-field
              v-model="picture.version.exif.model"
              label="Camera Model"
            />
            <v-text-field
              v-model="picture.version.exif.aperture"
              label="Aperture"
            />
            <v-text-field
              v-model="picture.version.exif.exposure"
              label="Exposure"
            />
            <v-text-field
              v-model="picture.version.exif.focalLength"
              label="Focal length"
            />
            <v-text-field
              v-model="picture.version.exif.iso"
              label="ISO"
            />
            <v-text-field
              v-model="picture.version.exif.flash"
              label="Flash"
            />
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          color="primary"
          @click="save"
        >
          Sauvegarder
        </v-btn>
      </v-card-actions>
    </v-card>
    <CatalogPicker ref="catalogPicker" @selection="handleCatalogSelection" />
  </Container>
</template>

<script>
import Container from '~/components/Container'
import PositionPicker from '~/components/PositionPicker.vue'
import CatalogPicker from '~/components/CatalogPicker'
import HistoricalDatePicker from '~/components/HistoricalDatePicker'

export default {
  components: {
    HistoricalDatePicker,
    CatalogPicker,
    Container,
    PositionPicker
  },
  data () {
    return {
      tab: 0,
      picture: {
        path: '/wow/super/cool',
        catalog: {
          id: '',
          name: 'wow'
        },
        version: {
          name: 'wow',
          description: 'qss',
          source: 'https://google.com',
          place: {
            id: 'OBJ43910U',
            name: 'Kennedy Space Center',
            shortDescription: 'United States space launch site',
            description: "The John F. Kennedy Space Center (KSC, originally known as the NASA Launch Operations Center), located on Merritt Island, Florida, is one of the National Aeronautics and Space Administration's (NASA) ten field centers. Since December 1968, KSC has been NASA's primary launch center of human spaceflight. Launch operations for the Apollo, Skylab and Space Shuttle programs were carried out from Kennedy Space Center Launch Complex 39 and managed by KSC.[3] Located on the east coast of Florida, KSC is adjacent to Cape Canaveral Space Force Station (CCSFS). The management of the two entities work very closely together, share resources and operate facilities on each other's property."
          },
          position: {
            lat: 28.58755,
            lng: -80.65287
          },
          exif: {
            manufacturer: 'NIKON CORPORATION',
            model: 'NIKON D700',
            aperture: 'f/4.0',
            iso: 1400,
            focalLength: '700.0 mm',
            exposure: '1/800 s',
            flash: true
          },
          license: {
            name: 'CC-BY',
            modified: false
          },
          takenAt: {
            precision: 'year',
            from: '2021-04-29T22:12:38+00:00'
          }
        }
      },
      date: ''
    }
  },
  methods: {
    openCatalogPicker () {
      this.$refs.catalogPicker.open()
    },
    handleCatalogSelection (catalog) {
      console.log('selection catalog:', catalog)
      this.picture.path = catalog.path
    },
    save () {
      this.$pushSnackbar('success', 'Thanks for your contribution')
      this.$router.push('/picture/' + this.picture.id + '/')
    }
  },
  head () {
    return {
      title: 'Edit an Image'
    }
  }
}
</script>
