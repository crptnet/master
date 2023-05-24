const mongoose = require('mongoose');

const keyPairSchema = new mongoose.Schema({
  publicKey : {
    type : String,
  },
  privateKey : {
    type : String,
  },
  required : false,
  markerId : {
    type : Integer,
  },
}
)

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
