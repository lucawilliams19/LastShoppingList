//dependencies
    //express is an api(Application Programming Interface)
    const express = require('express')
    const router = express.Router()
    const bcrypt = require('bcryptjs')
    const config = require('config')
    const jwt = require('jsonwebtoken')
    
    //User Model
    const User = require('../../models/User')
    
    //@route POST api/user
    //@desc  Register new user
    //@access Public
    router.post('/', (req, res) => {

        // Destructures data from the body
      const { name, email, password } = req.body

      //Simple verification
        //checks if all the fields are filled out
      if(!name || !email || !password){
          return res.status(400).json({ msg: 'Please enter all fields' })
      }

      //Checks to ensure that email is not already being used by another account
      User.findOne({ email }).then(user => {

            // if the user already exists with email then throw error
          if(user){
              return res.status(400).json({ msg: 'User already exists' })
          }

          //if user is not being used create a new user
          const newUser = new User({
              name,
              email,
              password
          })
          
          //Create Salt & Hash
          bcrypt.genSalt(10, (err, salt) => {
              //Checks if the hash went well
              if(err){
                  throw err
                }

              //Hashes the new password
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                
                //ensures that salting worked
                if(err){
                    throw err
                }
                
                //makes the password the hashed password
                newUser.password = hash
                //saves the hashed password
                newUser.save()
                    .then(user =>{
                        
                        //JWT Token implementing
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

      })

   })

    
    module.exports = router