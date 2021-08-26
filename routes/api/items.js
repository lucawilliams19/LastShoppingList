    //express is an api(Application Programming Interface)
const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

//@route GET api/items
//@desc GET All items
//@access Public
    //GET request that asks the api for data.
    //Intended for viewing data without changing the data.
    //requests data from a VERY specific location.
    //Disregards the impacts of a data request
router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items));
}); 


//@route POST api/items
//@desc Create a item
//@access Public
    //POST submits a package of data to be processed by an identified resource.
    //May result in the creation of a new resource or a modification to an existing piece of data */
router.post('/', (req, res) => {
   const newItem = new Item({
       name: req.body.name
   })

   newItem.save().then(item => res.json(item))

}); 

//@route DELETE api/items:id
//@desc DELETE a item
//@access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false})) 
 })
 


module.exports = router;