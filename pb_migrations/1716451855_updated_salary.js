/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zbwr85xh6vm32jr")

  collection.name = "job"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zbwr85xh6vm32jr")

  collection.name = "salary"

  return dao.saveCollection(collection)
})
