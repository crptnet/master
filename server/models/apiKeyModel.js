const mongoose = require('mongoose');



//Data schema for User
const apiKeysSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
        
}, 
{
  timestamps:true, 
});

const APIKey = mongoose.model('apiKeys', apiKeysSchema);

module.exports = APIKey;
