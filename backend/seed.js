// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Department = require('./models/Department');
const Expense = require('./models/Expense');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/expense', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await Department.deleteMany({});
  await User.deleteMany({});
  await Expense.deleteMany({});

  const [hr, sales, it] = await Department.create([
    { name: 'HR' },
    { name: 'Sales' },
    { name: 'IT' }
  ]);

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
    department: hr._id
  });

  const user = await User.create({
    name: 'Regular User',
    email: 'user@example.com',
    password: await bcrypt.hash('user123', 10),
    role: 'user',
    department: sales._id
  });

  await Expense.create([
    {
      user: user._id,
      department: sales._id,
      amount: 120,
      description: 'Client lunch',
      date: new Date(),
      status: 'approved'
    },
    {
      user: user._id,
      department: sales._id,
      amount: 300,
      description: 'Software subscription',
      date: new Date(),
      status: 'pending'
    }
  ]);

  console.log('✅ Database seeded');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
