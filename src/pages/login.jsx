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
      <Row justify={"center"} align={"middle"}>
        <Col xs={24}>
          <Row justify={"center"} align={"middle"} style={{ padding: "50px" }}>
            <h1>Secure Banking Research</h1>
          </Row>
        </Col>
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
