const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { useParams } = require('react-router-dom');
const app = express();
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = 5000;  // Changed port from 5173 to 5000

// Middleware to parse incoming requests
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://habeebsalehalhussain:windows11@cluster7.lhizk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster7', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
// Define Worker schema

// Worker Schema
const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true
  },
  worked:{
    type:String,
    required:true
  },
  done:{
    type:String,
    required:true
  },
  completed:{
    type:String,
    required:true
  }
});


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  aadharId: {
    type: String,
    required: true,
    unique: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password isn't modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Call next to continue to save the user
  } catch (error) {
    console.error('Error hashing password:', error.message); // Log the error message
    return next(error); // Pass the error to the next middleware
  }
});


// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};



const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // Project name is required
    trim: true
  }, 
  progress:{
    type:String,
    required:true,

  },
  workers:[workerSchema]
  // Automatically set to the current date
});


///forms///////////////////////////////////////////


const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: String, required: true }, // You can associate this with user info
  datePosted: { type: Date, default: Date.now },
  status: { type: String, default: 'Open' },
  votes: { type:Number, default: 0 } // Status can be Open, In Progress, Resolved
});






// Department Schema
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projects: [projectSchema], // Array of Project documents
});

// Models
const Worker = mongoose.model('Worker', workerSchema);
const Project = mongoose.model('Project', projectSchema);
const Department = mongoose.model('Department', departmentSchema);
const Issue=mongoose.model('Issue', issueSchema);
const User=mongoose.model('User',userSchema);

module.exports = {
  Worker,
  Project,
  Department,
  Issue,
  User
};
/////register/////////////////////////////////////////
// Signup Route with Aadhar ID and Department Name
app.post('/api/register', async (req, res) => {
  const { email, password, aadharId, departmentName } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ email, password, aadharId, departmentName });
    await user.save(); // This may throw an error if the pre-save fails

    // Generate JWT token
    console.log("saved");
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user._id, email: user.email, aadharId: user.aadharId, departmentName: user.departmentName } });
  } catch (error) {
    console.error('Registration error:', error); // Log the complete error
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    console.log("user found");
    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log(token);

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

// Authentication Middleware to Protect Routes
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Protected Route Example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route, user authenticated!' });
});



//////issues reqs////////////////
app.put('/api/issues/upvote/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).send('Issue not found');
    
    issue.votes += 1;
    await issue.save();
    
    res.json(issue);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


app.post('/api/issues/submit', async (req, res) => {
  try {
    const { title, description, postedBy } = req.body;
    const newIssue = new Issue({ title, description, postedBy });
    await newIssue.save();
    res.status(200).json({ message: 'Issue posted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting issue', error });
  }
});

// GET: Fetch all issues
app.get('/api/issues/all', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues', error });
  }
});


// POST request to insert a worker into a specific project within a department
app.post('/api/projects/:departmentId/:projectId/workers', async (req, res) => {
  const { departmentId, projectId } = req.params; // Department and Project ID from the request
  const { name, role, worked, done, completed } = req.body; // Worker data from request body

  try {
    // Find the department by ID
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Find the project in the department's projects array
    const project = department.projects.id(projectId);


    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create a new worker object
    const newWorker = {
      name,
      role,
      worked,
      done,
      completed,
    };
    console.log(newWorker);

    // Add the new worker to the project's workers array
    project.workers.push(newWorker);

    // Save the updated department (which includes the updated project)
    await department.save();

    res.status(201).json({ message: 'Worker inserted successfully', worker: newWorker });
  } catch (err) {
    res.status(400).json({ error: 'Failed to insert worker', details: err.message });
  }
});


// API route to fetch all workers
// API route to fetch workers of a specific project within a department
app.get('/api/projects/:departmentId/:projectId/workers', async (req, res) => {
  const { departmentId, projectId } = req.params;  // Access URL parameters
  try {
    // Find the department by ID
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    // Find the project in the department's projects array
    const project = department.projects.id(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
   

    res.status(200).json(project.workers);  // Return workers in the project
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workers', details: err.message });
  }
});


// PUT request to update worker by ID
// PUT request to update a worker by ID within a project
app.put('/api/projects/:departmentId/:projectId/workers/:workerId', async (req, res) => {
  const { departmentId, projectId, workerId } = req.params; // Get IDs from the URL
  const updatedData = req.body; // Data to update the worker

  try {
    // Find the department
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Find the project within the department
    const project = department.projects.id(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Find the worker within the project
    const worker = project.workers.id(workerId);

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Update worker fields
    worker.name = updatedData.name || worker.name;
    worker.role = updatedData.role || worker.role;
    worker.worked = updatedData.worked || worker.worked;
    worker.done = updatedData.done || worker.done;
    worker.completed = updatedData.completed || worker.completed;

    // Save changes
    await department.save();
    res.status(200).json({ message: 'Worker updated successfully', worker });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update worker', details: err.message });
  }
});


// API route to insert a project
app.post('/api/projects/:id', async (req, res) => {
  const { id } = req.params; // Department ID from the request
  const { name, progress } = req.body;
  try {
    console.log(id);
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Create a new project object
    const newProject = {
      name,
      progress
    };

    // Add the new project to the department's projects array
    department.projects.push(newProject);
    await department.save();
    res.status(201).json({ message: 'Project inserted', newProject });
  } catch (err) {
    res.status(400).json({ error: 'Failed to insert project', details: err });
  }
});

// API route to fetch all projects
app.get('/api/projects/:id', async (req, res) => {
  const { id } = req.params; // Department ID from the request
  try {
    console.log(id);
    const department = await Department.findById(id).populate('projects');
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
     // Populating department name
    res.status(200).json(department.projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects', details: err });
  }
});

app.put('/api/projects/:departmentId/:projectId', async (req, res) => {
  const { departmentId, projectId } = req.params; // Get department and project ID from URL params
  const updatedData = req.body; // Data to update the project
  
  try {
    // Find the department by ID
    const department = await Department.findById(departmentId);
    
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    // Find the project in the department's projects array
    const project = department.projects.id(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found in the department' });
    }
    
    // Update the project's fields with the data from the request
    project.name = updatedData.name || project.name;
    project.progress = updatedData.progress || project.progress;
    // Add other fields as necessary
    
    // Save the department (and therefore the updated project)
    await department.save();
    
    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project', details: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
