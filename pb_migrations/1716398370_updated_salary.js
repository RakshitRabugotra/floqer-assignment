/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zbwr85xh6vm32jr")

  collection.listRule = null
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zbwr85xh6vm32jr")

  collection.listRule = ""
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
