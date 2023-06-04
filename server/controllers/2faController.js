const expressAsyncHandler = require('express-async-handler')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const User = require('../models/userModel')
const JWT = require('jsonwebtoken')

const addTwoFactorAuthentication = expressAsyncHandler( async (req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        return res.status(404).send()
    }

    if(user.topt_status){
        return res.status(403).json({ message : 'User already created 2FA'})
    }

    const topt_secret = speakeasy.generateSecret({
        name : `Crpt (${user.username})`
    })
    
    user.topt_secret = topt_secret.base32
    await user.save()
    console.log(topt_secret)
    return qrcode.toDataURL(topt_secret.otpauth_url, (err, data) => {
        if(err) throw new Error(err)
        res.status(200).send({ uri : data })
    })
}) 

const verifyToptCode = expressAsyncHandler(async (req, res) => {
    const { token } = req.body
    const user = await User.findById(req.user.id)

    const verify_res = speakeasy.totp.verify({
        secret : user.topt_secret,
        encoding : 'base32',
        token : token,
        window: 1,
    })

    if(!verify_res){
        return res.status(401).send()
    }

    if(!user.topt_status){
        user.topt_status = true
        await user.save()
    }

    const verifedToken = JWT.sign(
        {
          user: {
                user_id : user.id,
                toptToken : token,
            },
        },
        process.env.TWOFA_TOKEN_SECERT,
        { expiresIn: "1d" }
      );

    res.status(200).send({ status : 'success', token : verifedToken })
})



module.exports = {
    addTwoFactorAuthentication,
    verifyToptCode,
}