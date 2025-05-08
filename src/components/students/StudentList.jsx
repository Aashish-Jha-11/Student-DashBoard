import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, getAvailableCourses } from '../../services/mockApi';
import styles from './StudentList.module.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await fetchStudents();
      setStudents(data);
      setFilteredStudents(data);
      
      const availableCourses = getAvailableCourses();
      setCourses(availableCourses);
    } catch (err) {
      setError('Failed to load students. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    // filter ke liye 
    let result = students;
    
    // course ka filter
    if (courseFilter) {
      result = result.filter(student => student.course === courseFilter);
    }
    
    // search wala filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(term) || 
        student.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredStudents(result);
  }, [courseFilter, searchTerm, students]);

  const handleCourseChange = (e) => {
    setCourseFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setCourseFilter('');
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          onClick={loadStudents} 
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.studentListContainer}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>Students</h2>
        <Link to="/add-student" className={styles.addButton}>
          Add New Student
        </Link>
      </div>
      
      <div className={styles.filterContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.courseFilterBox}>
          <select 
            value={courseFilter} 
            onChange={handleCourseChange}
            className={styles.courseSelect}
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          
          {(courseFilter || searchTerm) && (
            <button onClick={clearFilters} className={styles.clearFilterButton}>
              Clear Filters
            </button>
          )}
        </div>
      </div>
      
      {filteredStudents.length === 0 ? (
        <div className={styles.noResults}>
          <p>No students found matching your filters.</p>
        </div>
      ) : (
        <div className={styles.studentGrid}>
          {filteredStudents.map(student => (
            <Link 
              to={`/student/${student.id}`} 
              key={student.id}
              className={styles.studentCard}
            >
              <div className={styles.studentAvatar}>
                <img src={student.avatar} alt={student.name} />
              </div>
              <div className={styles.studentInfo}>
                <h3 className={styles.studentName}>{student.name}</h3>
                <p className={styles.studentEmail}>{student.email}</p>
                <p className={styles.studentCourse}>
                  <span className={styles.courseLabel}>Course:</span> {student.course}
                </p>
                <div className={styles.studentGrade}>
                  <span className={`${styles.gradeLabel} ${styles[`grade${student.grade.charAt(0)}`]}`}>
                    {student.grade}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;