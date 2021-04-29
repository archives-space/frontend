import { reject, resolve } from "core-js/fn/promise"

export default class ItemManager {
  constructor () {
    this.records = {}
    this.ttlInSeconds = 120
    this.path = '/catalogs/'
  }

  refreshChanges() {
    this.changes = [ // list of object changes
      {
        objectType: 'catalog',
        objectId: 'dsqqds',
        fieldChanges: [
          { path: 'name', type: 'edit', before: "Une faute d'orthografe", after: "Une faute d'ortographe" },
          { path: 'description', type: 'edit', before: "", after: "superCatalogue" }
        ]
      },
      {
        objectType: 'picture',
        objectId: 'wowoowow',
        fieldChanges: [
          { path: 'description', type: 'edit', before: "", after: "la super description" },
          { path: 'position.lat', type: 'delete', before: 23.2343544 },
          { path: 'position.lng', type: 'delete', before: 1.434334 }
        ]
      }
    ]
    // compute all changes and set the result into the store
  }

  isExpired (fetchedAt) {
    Math.abs((new Date()).getTime() - fetchedAt.getTime()) > this.ttlInSeconds*1000
  }


  get (identifier) {
    return new Promise(() => {
      let record = this.records[identifier]
      if (record == undefined || this.isExpired(record.fetchedAt)) {
        this.client.get(
          path + identifier
        ).then(async res => {
          const content = (await res.json()).data
          this.records[identifier] = {
            content,
            fetchedAt: new Date()
          }
          resolve(data)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      } else {
        if (isIdentifierASlug && this.slugIndex['']) {
          this.identifier
        }
        resolve()
      }
    })
  }

  add () {

  }
}