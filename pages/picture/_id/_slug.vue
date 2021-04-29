<template>
  <div>
    <v-breadcrumbs
      :items="navigationItems"
      large
    >
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          :to="item.href"
          :disabled="item.disabled"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-divider />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="9" xl="7">
          <v-row
            justify="center" align="center"
            class="mt-5 pb-3"
          >
            <v-img
              :max-width="maxWidth"
              :lazy-src="picture.smallPicture"
              :src="picture.mainPicture"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  />
                </v-row>
              </template>
            </v-img>
          </v-row>
          <v-row justify="center" align="center" class="mt-8">
            <v-col cols="12" lg="11" md="12">
              <div class="d-flex justify-space-between align-center">
                <v-btn
                  icon outlined
                  @click="previous()"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <Swiper
                  ref="swiperGallery"
                  class="swiper mx-4"
                  :options="swiperOptions"
                  @click-slide="handleClickSlide"
                >
                  <SwiperSlide
                    v-for="pic in gallery"
                    :key="pic.id"
                  >
                    <v-img
                      style="cursor: pointer"
                      width="114"
                      height="114"
                      :src="`${pic.src}`"
                      @click="navigateToPicture(pic)"
                    />
                  </SwiperSlide>
                </Swiper>
                <v-btn
                  icon outlined
                  @click="next()"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" xs="12" sm="10" md="8" lg="6" xl="5">
          <div class="d-flex justify-end mb-4">
            <v-btn
              color="info" outlined
              class="sm-mr-0 mr-3"
            >
              <v-icon left>
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
            <!--<v-btn
              color="secondary" outlined
              class="sm-mr-0 mr-3"
            >
              <v-icon left>
                mdi-arrow-expand-all
              </v-icon>
              Scale
            </v-btn>-->
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary" outlined
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>
                    mdi-download
                  </v-icon>
                  Download
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(resolution, index) in picture.resolutions"
                  :key="index"
                  link
                  @click="downloadResolution(resolution)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ resolution.name }} ({{ resolution.width }}x{{ resolution.height }})
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <v-card elevation="1">
            <v-card-text>
              {{ picture.validatedVersion.description }}
            </v-card-text>
          </v-card>

          <v-card class="mt-4">
            <v-card-text>
              <v-list>
                <v-divider />
                <!-- https://www.wikiarchives.space/picture.php?/71050/category/1884 -->

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-label</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ picture.validatedVersion.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Name
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-map-marker</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ picture.validatedVersion.place.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Place
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-calendar</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ picture.validatedVersion.takenAt }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Taken at
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-license</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ picture.validatedVersion.license.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      License
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider />
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-book</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ picture.validatedVersion.source }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Source link
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
              </v-list>
              <v-list>
                <v-subheader>EXIF data</v-subheader>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-divider />
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-camera</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- Canon EOS 7D Mark II -->
                          {{ picture.validatedVersion.exif.model }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Camera Model
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider/>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-magnify</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ picture.validatedVersion.exif.focalLength }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Focal length
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider />
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-camera-iris</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ picture.validatedVersion.exif.aperture }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Aperture
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-divider />
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-timer</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ picture.validatedVersion.exif.exposure }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Exposure
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider />
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-brightness-6</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ picture.validatedVersion.exif.iso }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          ISO
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />

                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-flash-off</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          <span v-if="picture.validatedVersion.flash">
                            On, fired
                          </span>
                          <span v-else>
                            Off, did not fire
                          </span>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Flash
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                  </v-col>
                </v-row>
              </v-list>
            </v-card-text>
          </v-card>
          <!-- <v-toolbar flat>
            <v-spacer />
            <v-btn color="error" small class="mr-3" icon outlined>
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="info" small icon outlined>
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </v-toolbar> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  asyncData () {
    const picture = {
      catalog: {
        id: '',
        name: 'wow'
      },
      validatedVersion: {
        name: 's67-50433',
        description: 'The Apollo 4 (Spacecraft 017/Saturn 501) space mission was launched from Pad A, Launch Complex 39, Kennedy Space Center, Florida. The liftoff of the huge 363-feet tall Apollo/Saturn V space vehicle was at 7:00:01 a.m. (EST), Nov. 9, 1967. The successful objectives of the Apollo 4 Earth-orbital unmanned space mission obtained included (1) flight information on launch vehicle and spacecraft structural integrity and compatibility, flight loads, stage separation, subsystem operation, and (2) evaluation of the Apollo Command Module heat shield under conditions encountered on return from a moon mission. ',
        takenAt: 'Thursday 9 November 1967',
        source: 'https://spaceflight.nasa.gov/gallery/images/apollo/apollo4/html/s67-50433.html',
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
        createdAt: null
      },
      resolutions: [
        {
          slug: 'original',
          name: 'Original',
          width: 900,
          height: 500,
          file: { url: 'https://wikiarchives.space/_data/i/upload/2020/11/07/20201107112711-c93ae157-xx.jpg' }
        },
        {
          slug: 'sm',
          name: 'Small',
          width: 200,
          height: 100,
          file: { url: 'https://wikiarchives.space/_data/i/upload/2020/11/07/20201107112711-c93ae157-xs.jpg' }
        }
      ]
      // https://www.wikiarchives.space/picture.php?/69348/category/2067
    }
    picture.smallPicture = picture.resolutions.filter(r => r.slug === 'sm')[0].file.url
    console.log(picture.resolutions.filter(r => r.slug === 'sm'))
    picture.mainPicture = picture.resolutions.filter(r => r.slug === 'original')[0].file.url
    return {
      navigationItems: [
        {
          text: 'US SPACE PROGRAM',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'APOLLO',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'TRAINING & SELECTIONS',
          disabled: false,
          href: 'breadcrumbs_link_2'
        },
        {
          text: 'CATALOG',
          disabled: false,
          href: 'breadcrumbs_link_2'
        },
        {
          text: 'Meanwhile, on Earth',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ],
      picture,
      gallery: [
        {
          id: 11,
          src: 'https://wikiarchives.space/_data/i/upload/2020/08/03/20200803005751-3fa51c9c-cu_e520x360.jpg'
        },
        {
          id: 12,
          src: 'https://wikiarchives.space/_data/i/upload/2020/07/29/20200729082824-86eae519-cu_e520x360.jpg'
        },
        {
          id: 13,
          src: 'https://wikiarchives.space/_data/i/upload/2020/07/29/20200729082919-5b75b56a-cu_e520x360.jpg'
        },
        {
          id: 14,
          src: 'https://wikiarchives.space/_data/i/upload/2020/08/03/20200803005605-fad0680a-cu_e520x360.jpg'
        },
        {
          id: 15,
          src: 'https://wikiarchives.space/_data/i/upload/2020/08/03/20200803005652-6da1861a-cu_e520x360.jpg'
        },
        {
          id: 16,
          src: 'https://wikiarchives.space/_data/i/upload/2020/08/03/20200803005355-b9859c6f-cu_e520x360.jpg'
        },
        {
          id: 17,
          src: 'https://wikiarchives.space/_data/i/upload/2020/08/03/20200803005524-abda46e9-cu_e520x360.jpg'
        },
        {
          id: 18,
          src: 'https://wikiarchives.space/_data/i/upload/2020/07/29/20200729082427-a6798108-cu_e520x360.jpg'
        },
        {
          id: 19,
          src: 'https://wikiarchives.space/_data/i/upload/2020/07/29/20200729082634-d03e3810-cu_e520x360.jpg'
        }
      ]
    }
  },
  data () {
    return {
      maxWidth: '80%',
      picture: {},
      navigationItems: [],
      gallery: [],
      swiperOptions: {
        activeIndex: 3,
        centeredSlides: true,
        slidesPerView: 6,
        spaceBetween: 10
      }
    }
  },
  watch: {
    '$vuetify.breakpoint.xs' () {
      this.refreshBreakpoint()
    },
    '$vuetify.breakpoint.sm' () {
      this.refreshBreakpoint()
    },
    '$vuetify.breakpoint.md' () {
      this.refreshBreakpoint()
    },
    '$vuetify.breakpoint.lg' () {
      this.refreshBreakpoint()
    },
    '$vuetify.breakpoint.xl' () {
      this.refreshBreakpoint()
    }
  },
  mounted () {
    if (!this.$isServer) {
      this.$refs.swiperGallery.$swiper.slideTo(3, 1000, false)
      this.refreshBreakpoint()
    }
  },
  methods: {
    refreshBreakpoint () {
      let slidesPerView = 4
      this.maxWidth = '60%'
      console.log(this.$vuetify.breakpoint)
      if (this.$vuetify.breakpoint.xsOnly) {
        slidesPerView = 3
        this.maxWidth = '80%'
      }
      if (this.$vuetify.breakpoint.smOnly) {
        slidesPerView = 5
        this.maxWidth = '75%'
      }
      if (this.$vuetify.breakpoint.mdAndUp) {
        slidesPerView = 7
      }
      this.$refs.swiperGallery.swiperInstance.params.slidesPerView = slidesPerView
      this.$refs.swiperGallery.swiperInstance.update()
    },
    previous () {
      this.$refs.swiperGallery.$swiper.slidePrev()
    },
    next () {
      this.$refs.swiperGallery.$swiper.slideNext()
    },
    handleClickSlide (pic) {
      console.log('Navigate to picture called', pic)
    },
    navigateToPicture (pic) {
      console.log('Navigate to picture called', pic)
    },
    downloadResolution (resolution) {
      window.open(resolution.file.url, '_blank')
    }
  },
  head () {
    return {
      title: 'Photo'
    }
  }
}
</script>
