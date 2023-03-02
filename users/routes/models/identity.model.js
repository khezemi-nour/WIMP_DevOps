const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env' )});

mongoose.connect(process.env.mongoDbUrl || "mongodb://localhost:27017/myapp",{ useUnifiedTopology: true });
const Schema = mongoose.Schema;

const identiySchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    birthday: Date,
    userName:String,
    password: String,
    permissionLevel: Number,
    departement : String,
    status: Array, 
    devices:Array,
    noderedInstance: Object
},{ timestamps: true });

identiySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
identiySchema.set('toJSON', {
    virtuals: true
});

identiySchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const Identity = mongoose.model('Users', identiySchema);

exports.findByEmail = (email) => {
    return Identity.find({email: email});
};
exports.findById = (id) => {
    return Identity.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.findByUserName = (name) =>  {
    return Identity.find({userName:name})
}

exports.createIdentity = (userData) => {
    console.log(userData);
    const user = new Identity(userData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Identity.find()
            .limit(perPage)
            .skip(perPage * page)

            .exec().then((users)  => {
                resolve(users);
                
            }).catch((err) => { 
                reject(err);

             }) 
    });
};

exports.putIdentity = (id,data) => {
    return new Promise((resolve, reject) => {
        Identity.findByIdAndUpdate(id,data).then(
           function(user) {
               return resolve(user);
        
        }).catch((err) => { 
        reject(err);

     }) 
    });
};


exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Identity.deleteOne({_id: id}).then(
            function(user) {
                return resolve(user);
         
         }).catch((err) => { 
         reject(err);
 
      })      
    });
};

