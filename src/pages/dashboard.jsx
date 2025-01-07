import { Row, Col, Button } from "antd";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    history.push("/");
  };

  const handleDataset1 = () => {
    history.push("/dataset1");
  };

  const handleDataset2 = () => {
    history.push("/dataset2");
  };

  const handleDataset3 = () => {
    history.push("/dataset3");
  };

  return (
    <div
      style={{
        padding: "20px",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Row align={"middle"} justify={"center"}>
        <Col xs={24} style={{ margin: "0px", padding: "50px" }}>
          <Row align={"middle"} justify={"center"}>
            <h1>Secure Banking Research</h1>
          </Row>
        </Col>
        <Col xs={24} style={{ margin: "0px", padding: "10px" }}>
          <Row align={"middle"} justify={"center"} style={{ color: "red" }}>
            <h2>You have 13 queries left.</h2>
          </Row>
        </Col>
        <Col xs={8} style={{ padding: "10px" }}>
          <Button type="primary" block onClick={handleDataset1}>
            Dataset 1
          </Button>
        </Col>
        <Col xs={8} style={{ padding: "10px" }}>
          <Button type="primary" block onClick={handleDataset2}>
            Dataset 2
          </Button>
        </Col>
        <Col xs={8} style={{ padding: "10px" }} onClick={handleDataset3}>
          <Button type="primary" block>
            Dataset 3
          </Button>
        </Col>
        <Col xs={24} style={{ padding: "100px" }}>
          <Row align={"middle"} justify={"center"}>
            <Button
              type="primary"
              block
              onClick={handleLogout}
              style={{ width: "50%" }}
            >
              Logout
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
