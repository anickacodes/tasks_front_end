import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const EditTaskForm = ({ user, token }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
    user_id: user.user_id,
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/users/${user.user_id}/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/tasks");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    fetch(`${API}/users/${user.user_id}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Authorization": token
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        navigate("/tasks")})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`${API}/users/${user.user_id}/tasks/${taskId}`, {
      headers: {
        "Authorization": token
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setFormData((prev) => ({
          title: res.title,
          description: res.description,
          completed: res.completed,
          user_id: res.user_id,
        }));
      })
      .catch((err) => console.error(err));
  }, [taskId, token, user.user_id]);

  return (
    <Container style={{ marginTop: "7px" }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Task
            </Button>{" "}
            <Button variant="danger" onClick={handleDelete}>
              Delete Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTaskForm;
