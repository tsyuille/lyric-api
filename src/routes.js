const express = require('express')
const router = express.Router()
const Lyric = require('./models/Lyric')

// get all lyrics
router.get('/lyrics', async (req, res) => {
    try {
        const lyrics = await Lyric.find()
        return res.status(200).json(lyrics)
    } catch (error) {
        return res.status(500).json({'error': error})
    }
})

// get one lyric
router.get('/lyrics/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const lyric = await Lyric.findOne({_id})
        if(!lyric){
            return res.status(404).json({})
        } else {
            return res.status(200).json(lyric)
        }
    } catch (error) {
        return res.status(500).json({'error': error})
    }
})

// create one lyric
router.post('/lyrics', async (req, res) => {
    try {
        const { description } = req.body
        const { alternatives } = req.body

        const lyric = await Lyric.create({
            description, 
            alternatives
        })

        return res.status(201).json(lyric)
    } catch (error) {
        return res.status(500).json({'error': error})
    }
})

// update one lyric 
router.put('/lyrics/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const { description, alternatives } = req.body

        let lyric = await Lyric.findOne({_id})

        if(!lyric){
            lyric = await Lyric.create({
                description, 
                alternatives
            })
            return res.status(201).json(lyric)
        } else {
            lyric.description = description
            lyric.alternatives = alternatives
            await lyric.save()
            return res.status(200).json(lyric)
        }
    } catch (error) {
        return res.status(500).json({'error': error})
    }
})

// delete one lyric
router.delete('/lyrics/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const lyric = await Lyric.deleteOne({_id})

        if(lyric.deletedCount === 0) {
            return res.status(404).json()
        } else {
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({'error': error})
    }
})

module.exports = router