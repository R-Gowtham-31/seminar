import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const StudentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sem1: '',
    sem2: '',
    sem3: '',
    sem4: '',
    sem5: '',
    sem6: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/get-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setFormData({
        name: data.name,
        email: data.email,
        sem1: data.sem1,
        sem2: data.sem2,
        sem3: data.sem3,
        sem4: data.sem4,
        sem5: data.sem5,
        sem6: data.sem6,
      });
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/update-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          sem1: parseFloat(formData.sem1),
          sem2: parseFloat(formData.sem2),
          sem3: parseFloat(formData.sem3),
          sem4: parseFloat(formData.sem4),
          sem5: parseFloat(formData.sem5),
          sem6: parseFloat(formData.sem6),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Form successfully submitted:', result);
      alert("Successfully submitted");
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Error occurred while submitting");
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:5000/delete-student', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert("Student record deleted successfully");
      navigate('/');
      setFormData({
        name: '',
        email: '',
        sem1: '',
        sem2: '',
        sem3: '',
        sem4: '',
        sem5: '',
        sem6: '',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error deleting record:', error);
      alert("Error occurred while deleting");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled
        />
      </div>
      <div>
        <label>Semester 1 GPA:</label>
        <input
          type="number"
          name="sem1"
          value={formData.sem1}
          onChange={handleChange}
          disabled={!isEditing}
          step="0.01"
          min="0"
          max="10"
          required
        />
      </div>
      <div>
        <label>Semester 2 GPA:</label>
        <input
          type="number"
          name="sem2"
          value={formData.sem2}
          onChange={handleChange}
          disabled={!isEditing}
          step="0.01"
          min="0"
          max="10"
          required
        />
      </div>
      <div>
        <label>Semester 3 GPA:</label>
        <input
          type="number"
          name="sem3"
          value={formData.sem3}
          onChange={handleChange}
          disabled={!isEditing}
          step="0.01"
          min="0"
          max="10"
          required
        />
      </div>
      <div>
        <label>Semester 4 GPA:</label>
        <input
          type="number"
          name="sem4"
          value={formData.sem4}
          onChange={handleChange}
          disabled={!isEditing}
          step="0.01"
          min="0"
          max="10"
          required
        />
      </div>
      <div>
        <label>Semester 5 GPA:</label>
        <input
          type="number"
          name="sem5"
          value={formData.sem5}
          onChange={handleChange}
          disabled={!isEditing}
          step="0.01"
          min="0"
          max="10"
          required
        />
      </div>
      <div>
        <label>Semester 6 GPA:</label>
        <input
          type="number"
          name="sem6"
          value={formData.sem6}
          onChange={handleChange}
          disabled={!isEditing}
          step="0.01"
          min="0"
          max="10"
          required
        />
      </div>
      <button type="button" onClick={handleEdit}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      <button type="submit" disabled={!isEditing}>
        Submit
      </button>
      <button
        type="button"
        className="delete-button"
        style={{
          background: isHovered ? '#bd454f' : '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          padding: '10px 15px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginLeft: '10px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleDelete}
      >
        Delete
      </button>
    </form>
  );
};

export default StudentForm;
