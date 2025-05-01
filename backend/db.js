const mongoose = require('mongoose');

const connectDB = async () => {
try{
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/Gofood', { // Note: Gofood with capital G
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ MongoDB Connected');
    
    // Get database instance
    
    // Fetch from correct collection name (note the capital I)
    const foodItems = await mongoose.connection.db.collection('food_Items').find({}).toArray();
    global.food_Items = foodItems;
    // console.log(`Fetched ${foodItems.length} food items`);
    //  console.log(foodItems);
    //  console.log(  global.food_Items);

    const foodCategory = await mongoose.connection.db.collection('food_category').find({}).toArray();
    global.food_Category = foodCategory;
    // console.log(`Fetched ${foodCategory.length} food items`);
    //  console.log(global.food_Category);

  }catch(err){
    console.error('❌ Error connecting to MongoDB:', err);
  }
};
module.exports = connectDB;