<template>
  <div>
    <v-list />
  </div>
</template>

<script>
export default {
  props: {
    activity: {
      type: Array,
      default: () => ([
        {
          changes: [
            {
              objectType: 'picture',
              objectId: 'wow',
              fieldChanges: [
                { path: 'name', type: 'edit' }
              ]
            }
          ]
        },
        {
          changes: [
            {
              objectType: 'catalog',
              objectId: 'dsqqds',
              fieldChanges: [
                { path: 'name', type: 'edit', before: "Une faute d'orthografe", after: "Une faute d'ortographe" },
                { path: 'description', type: 'edit', before: '', after: 'superCatalogue' }
              ]
            },
            {
              objectType: 'picture',
              objectId: 'wowoowow',
              fieldChanges: [
                { path: 'description', type: 'edit', before: '', after: 'la super description' },
                { path: 'position.lat', type: 'delete', before: 23.2343544 },
                { path: 'position.lng', type: 'delete', before: 1.434334 }
              ]
            }
          ]
        }
      ])
    }
  }
}
</script>
