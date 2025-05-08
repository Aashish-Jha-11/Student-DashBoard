import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let students = [
  { 
    id: 1, 
    name: 'Sita Patel', 
    email: 'sita.patel@example.com', 
    phone: '+91 98765 43210',
    address: '42 Koramangala, Bangalore, Karnataka 560034',
    course: 'Data Science',
    grade: 'B+',
    enrollmentDate: '2023-09-01',
    avatar: 'https://images.unsplash.com/photo-1660798027105-5da8ad164e27?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D'
  },
  { 
    id: 2, 
    name: 'Aashish Jha', 
    email: 'aashish.jha@example.com',
    phone: '+91 9424913050',
    address: '456 Hostel, Pune, 4444', 
    course: 'Computer Science',
    grade: 'A',
    enrollmentDate: '2024-07-11',
    avatar: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D'
  },
  { 
    id: 3, 
    name: 'Priya Sharma', 
    email: 'priya.sharma@example.com',
    phone: '+91 87654 32109',
    address: '123 Banjara Hills, Hyderabad, Telangana 500034', 
    course: 'Artificial Intelligence',
    grade: 'A-',
    enrollmentDate: '2023-09-05',
    avatar: 'https://plus.unsplash.com/premium_photo-1681248156367-d95876bf885d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D'
  },
  { 
    id: 4, 
    name: 'Vikram Mehta', 
    email: 'vikram.mehta@example.com',
    phone: '+91 76543 21098',
    address: '78 Park Street, Kolkata, West Bengal 700016', 
    course: 'Web Development',
    grade: 'A',
    enrollmentDate: '2023-08-20',
    avatar: 'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D'
  },
  { 
    id: 5, 
    name: 'Meera Iyer', 
    email: 'meera.iyer@example.com',
    phone: '+91 65432 10987',
    address: '56 Marine Drive, Mumbai, Maharashtra 400020', 
    course: 'Computer Science',
    grade: 'B',
    enrollmentDate: '2023-09-10',
    avatar: 'https://plus.unsplash.com/premium_photo-1683141506839-c8a751f227b2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D'
  },
  { 
    id: 6, 
    name: 'Rahul Khanna', 
    email: 'rahul.khanna@example.com',
    phone: '+91 54321 09876',
    address: '34 Connaught Place, New Delhi, Delhi 110001', 
    course: 'Data Science',
    grade: 'A-',
    enrollmentDate: '2023-08-25',
    avatar: 'https://images.unsplash.com/photo-1473492201326-7c01dd2e596b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D'
  }
];

// moc adapter ka new instance
const mock = new MockAdapter(axios, { delayResponse: 1000 });

// Mock GET saare students ko fetch
mock.onGet('/api/students').reply(200, {
  students: students
});

// Mock GET student id se 
mock.onGet(/\/api\/students\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop());
  const student = students.find(s => s.id === id);
  
  if (student) {
    return [200, { student }];
  } else {
    return [404, { message: 'Student not found' }];
  }
});

// Mock POST new student ko add krne ke liye 
mock.onPost('/api/students').reply((config) => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = students.length + 1;
  newStudent.avatar = 'https://images.unsplash.com/photo-1545696968-1a5245650b36?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D';
  
  // array me new student ko add
  students.push(newStudent);
  
  return [201, { student: newStudent }];
});

export const fetchStudents = async () => {
  try {
    const response = await axios.get('/api/students');
    return response.data.students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const fetchStudentById = async (id) => {
  try {
    const response = await axios.get(`/api/students/${id}`);
    return response.data.student;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    throw error;
  }
};

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post('/api/students', studentData);
    return response.data.student;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const getAvailableCourses = () => {
  const courses = new Set(students.map(student => student.course));
  return Array.from(courses);
};