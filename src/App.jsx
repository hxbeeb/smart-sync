// App.js
import './App.css';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Projects from './components/Projects';
import Conflicts from './components/conflicts';
import Leaflet from './components/Leaflet';
import Chat from './components/Chat';
import Resources from './components/Resources';
import APIS from './components/APIS';
import Legal from './components/Legal';
import Tenders from './components/Tenders';
import CCTV from './components/CCtv';
import Disputes from './components/Disputes';
import Progress from './components/progress';
import Departments from './components/departments';
import Projectss from './components/Projectss';
import Workers from './components/Workers';
import EditPro from './components/EditPro';
import WorkerForm from './components/WorkerForm';
import Issues from './components/Issues';
import Register from './components/register';
// import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        // <AuthProvider> {/* Wrap with AuthProvider */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={Dashboard} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/conflicts" element={<Conflicts />} />
                    <Route path="/leaflet" element={<Leaflet />} />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/tenders" element={<Tenders />} />
                    <Route path="/cctv" element={<CCTV />} />
                    <Route path="/disputes" element={<Disputes />} />
                    <Route path="/api" element={<APIS />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/projectss/:departmentId" element={<Projectss />} />
                    <Route path="/projectss/:departmentId/:projectId/progress" element={<Progress />} />
                    <Route path="/projectss/:departmentId/:projectId/workers" element={<Workers />} />
                    <Route path="/projectss/:departmentId/:projectId" element={<EditPro />} />
                    <Route path="/projectss/:departmentId/:projectId/:workerId" element={<WorkerForm />} />
                    <Route path="/issues" element={<Issues />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        // </AuthProvider>
    );
}

export default App;
