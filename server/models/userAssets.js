const mongoose = require('mongoose');

const asset = new mongoose.Schema({
    asset : {
        type : String,
    },
    available : {
        type : Number,
    },
    onOrder : {
        type : Number,
    }
},
{
  timestamps : true,
});

const apiKeysSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    assets : {
      type : [asset],
    }, 
}, 
{
  timestamps:true, 
});

const userAssets = mongoose.model('apiKeys', apiKeysSchema);

module.exports = userAssets;
