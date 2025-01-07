import { Row, Col, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/dashboard");
  };

  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Row>
        <Col xs={24} style={{ margin: "0px", padding: "0px" }}>
          <Input placeholder="Username" />
        </Col>
        <Col xs={24} style={{ margin: "0px", padding: "0px" }}>
          <Input.Password placeholder="Password" />
        </Col>
        <Col xs={24} style={{ margin: "0px", padding: "0px" }}>
          <Button type="primary" block onClick={handleLogin}>
            Login
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
