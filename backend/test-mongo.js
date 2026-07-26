const mongoose = require('mongoose');

const uri = 'mongodb+srv://drissdidi34_db_user:EP3jscD91ZfslyBX@cluster0.jyjgima.mongodb.net/?appName=Cluster0';

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('✅ MongoDB Connected!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB Error:', err.message);
  process.exit(1);
});
