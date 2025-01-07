import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";

const Dateset2 = () => {
  const history = useHistory();

  const handleGoBack = () => {
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
      <Row align={"middle"} justify={"center"}>
        <Col xs={24}>
          <h1>Dataset 2</h1>
        </Col>
        <Col xs={24}>
          <Button type="primary" block onClick={handleGoBack}>
            Go Back
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Dateset2;
