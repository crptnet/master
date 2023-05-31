const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: true,
  },
  available: {
    type: String,
    required: true,
  },
  onOrder: {
    type: String,
    required: true,
  },
});

const userAssetsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  keyPair_id: {
    type: String,
    required: true,
  },
  assets: [{
    date: {
      type: [assetSchema],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

const UserAssets = mongoose.model('UserAssets', userAssetsSchema);

module.exports = UserAssets;
