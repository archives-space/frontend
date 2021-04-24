<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8">
        <v-breadcrumbs
          :items="navigationItems"
          large
        />
        <v-row
          justify="center" align="center"
          class="mt-5"
        >
          <v-img
            max-width="700px"
            :src="image.image"
          />
        </v-row>
      </v-col>
      <v-col cols="12" lg="4">
        <div class="d-flex justify-end mb-4">
          <v-btn
            color="secondary" outlined
            class="sm-mr-0 mr-3"
          >
            <v-icon left>
              mdi-arrow-expand-all
            </v-icon>
            Scale
          </v-btn>
          <v-btn color="primary" outlined>
            <v-icon left>
              mdi-download
            </v-icon>
            Download
          </v-btn>
        </div>
        <v-card elevation="1">
          <v-card-text>
            Accusam ipsum et dolore sadipscing labore labore est lorem sit. Sed est stet nonumy duo kasd sanctus sea amet ut. Ut eos aliquyam ipsum aliquyam ut labore. Invidunt sit sed dolor rebum ipsum et est eirmod. Vero diam et erat amet gubergren. Aliquyam justo elitr lorem et accusam diam. Diam sadipscing consetetur sadipscing sit no voluptua et rebum magna, diam.Ipsum no et voluptua ipsum diam magna. Gubergren consetetur no erat justo rebum justo dolor stet magna. Est kasd eos.
          </v-card-text>
        </v-card>

        <v-list class="mt-4">
          <v-divider />
          <!-- https://www.wikiarchives.space/picture.php?/71050/category/1884 -->

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-label</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                ksc-20190702-ph awg03 0010 48181617982 o
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
                Kennedy Space Center, Florida
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
                Mardi 2 Juillet 2019
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
                CC BY-NC-ND
              </v-list-item-title>
              <v-list-item-subtitle>
                License
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
                    Canon EOS 7D Mark II
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Camera Model
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider />
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    700.0 mm
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
                    f/4.0
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
                    1/800 s
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
                    700
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
                    Off, did not fire
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
</template>

<script>
export default {
  data: () => ({
    image: {
      name: 'S65-33249',
      description: 'The coast line of Florida and the Cape Kennedy area can be seen in this image taken from the Gemini-4 spacecraft during one of its passes over the United States. The photograph was made using a hand-held Hasselblad camera. The Gemini-4 spaceflight was a four-day, 62-revolution mission with astronauts James A. McDivitt, command pilot, and Edward H. White II, pilot, as crew members.',
      source: 'https://www.flickr.com/photos/nasa2explore/9350506103/in/album-72157635042158450/',
      place: {
        id: 'OBJ43910U',
        name: 'Space'
      },
      position: { lat: 0, lng: 0 },
      exif: {
        make: 'NIKON CORPORATION',
        model: 'NIKON D700',
        aperture: 'f/4.0',
        iso: '1400'
      },
      image: 'https://www.wikiarchives.space/_data/i/upload/2020/09/15/20200915003855-0acea860-xl.jpg',
      license: {
        name: 'CC-BY',
        modified: false
      }
      // https://www.wikiarchives.space/picture.php?/69348/category/2067
    },
    navigationItems: [
      {
        text: 'US SPACE PROGRAM',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      },
      {
        text: 'ORION/SLS',
        disabled: false,
        href: 'breadcrumbs_link_1'
      },
      {
        text: 'ASCENT ABORT 2',
        disabled: false,
        href: 'breadcrumbs_link_2'
      },
      {
        text: 'Mission Photos',
        disabled: false,
        href: 'breadcrumbs_link_2'
      },
      {
        text: 'Meanwhile, on Earth',
        disabled: true,
        href: 'breadcrumbs_link_2'
      }
    ]
  })
}
</script>
