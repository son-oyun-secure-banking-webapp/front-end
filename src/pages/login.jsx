/** @format */

import { Row, Col, Input, Button, Typography, Card } from "antd";
import { useHistory } from "react-router-dom";
import backgroundImage from "./background.png";

const { Title } = Typography;

const Login = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/dashboard");
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
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Hafif opak beyaz
        }}
      >
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Title level={3} style={{ color: "#1890ff", marginBottom: "0px" }}>
            Secure Banking Research
          </Title>
        </Row>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Input placeholder="Username" size="large" />
          </Col>
          <Col span={24}>
            <Input.Password placeholder="Password" size="large" />
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              size="large"
              block
              onClick={handleLogin}
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

