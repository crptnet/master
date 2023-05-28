const mongoose = require('mongoose');

const keyPairSchema = new mongoose.Schema({
  publicKey : {
    type : String,
  },
  privateKey : {
    type : String,
  },
  publicIv : {
    type : String,
  },
  privateIv : {
    type : String,
  },
  marketId : {
    type : Number,
  },
},
{
  timestamps : true,
});

const apiKeysSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    keys : {
      type : [keyPairSchema],
    }, 
}, 
{
  timestamps:true, 
});

const APIKeys = mongoose.model('apiKeys', apiKeysSchema);

module.exports = APIKeys;
