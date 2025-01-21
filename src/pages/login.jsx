import { Row, Col, Input, Button, Typography, Card, message } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import backgroundImage from "./background.png";
import axios from "axios";

const { Title } = Typography;

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      message.error("Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/check-user", {
        params: { username, password },
        withCredentials: true, 
      });

      console.log("Response received:", response.data);

      if (response.status === 200) {
        message.success("Login successful");
        const userId = response.data.id;
        history.push(`/dashboard/${userId}`);
      } else {
        message.error(response.data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
      message.error("An error occurred while logging in");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Title level={3} style={{ color: "#1890ff", marginBottom: "0px" }}>
            Secure Banking Research
          </Title>
        </Row>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Input
              placeholder="Username"
              size="large"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Input.Password
              placeholder="Password"
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              size="large"
              block
              onClick={handleLogin}
              loading={loading}
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;
