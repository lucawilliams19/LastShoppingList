//dependencies
    //express is an api(Application Programming Interface)
    const express = require('express')
    const router = express.Router()
    const bcrypt = require('bcryptjs')
    const config = require('config')
    const jwt = require('jsonwebtoken')
    const auth = require('../../middleware/auth')
    
    //User Model
    const User = require('../../models/User')
    
    //@route POST api/auth
    //@desc  Auth User 
    //@access Public
    router.post('/', (req, res) => {

        // Destructures data from the body
      const { email, password } = req.body

      //Simple verification
        //checks if all the fields are filled out
      if(!email || !password){
          return res.status(400).json({ msg: 'Please enter all fields' })
      }

      //Checks to ensure that email is not already being used by another account
      User.findOne({ email }).then(user => {

            // if the user already exists with email then throw error
          if(!user){
              return res.status(400).json({ msg: 'User does not exist' })
          }

          //Validate password
          bcrypt.compare(password, user.password)
          .then(isMatch => {
              if(!isMatch){
                  return(res.status(400).json({ msg: 'Invalid Credentials' }))
              }

              jwt.sign(

                { id: user.id },
                config.get('jwtSecret'),
                //expires in 1 hour or 3600 seconds
                { expiresIn: 3600 },
                //callback function
                (err,token) => {
                    if(err) throw err
                    
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )
          })
      })
   })

    
    //@route GET api/auth/user
    //@desc  GET user data
    //@access Public
    router.get('/user', auth, (req, res) => {
        console.log('api/auth/user works')
        //pulls in
        User.findById(req.user.id)
        .select('-pasword')
        .then(user => res.json(user))
    })

    
    module.exports = router