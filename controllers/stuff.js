const Thing = require('../models/Thing')

exports.getThing = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }))
}

exports.getThingById = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }))
}

exports.createThings = (req, res, next) => {
    const thingObject = req.body
    delete thingObject._id
    delete thingObject._userId
    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId
    })
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet cree avec succes!' }))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteThings = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: "unauthorized for modification" })
            } else {
                Thing.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "deleted successfully" }))
                    .catch(error => res.status(400).json({ message: "Cannot delete" }))
            }
        })
        .catch(error => res.status(400).json({ error }))
}

exports.updateThings = (req, res, next) => {
    const thingObject = req.body
    delete thingObject._id
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: "unauthorized for modification" })
            } else {
                Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
                    .then(() => res.status(200).json({ message: "modified successfully" }))
                    .catch(error => res.status(400).json({ message: "Object not found in database" }))
            }
        })
        .catch(error => res.status(400).json({ error }))
}