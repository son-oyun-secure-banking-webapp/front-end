import { Row, Col, Button, Divider, Modal } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Dateset2 = () => {
  const history = useHistory();

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [isModal4Open, setIsModal4Open] = useState(false);

  const handleOpenModal1 = () => {
    setIsModal1Open(true);
  };

  const handleOpenModal2 = () => {
    setIsModal2Open(true);
  };

  const handleOpenModal3 = () => {
    setIsModal3Open(true);
  };

  const handleOpenModal4 = () => {
    setIsModal4Open(true);
  };

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
        <Modal open={isModal1Open} onCancel={() => setIsModal1Open(false)}>
          <h1>Answer 1</h1>
        </Modal>
        <Modal open={isModal2Open} onCancel={() => setIsModal2Open(false)}>
          <h1>Answer 2</h1>
        </Modal>
        <Modal open={isModal3Open} onCancel={() => setIsModal3Open(false)}>
          <h1>Answer 3</h1>
        </Modal>
        <Modal open={isModal4Open} onCancel={() => setIsModal4Open(false)}>
          <h1>Answer 4</h1>
        </Modal>
        <Col xs={24}>
          <Row align={"middle"} justify={"center"}>
            <Col xs={24}>
              <Row>
                <Col xs={12}>Query 1</Col>
                <Col xs={12}>
                  {" "}
                  <Button
                    type="primary"
                    style={{ background: "green" }}
                    onClick={handleOpenModal1}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col xs={12}>Query 2</Col>
                <Col xs={12}>
                  {" "}
                  <Button
                    type="primary"
                    style={{ background: "green" }}
                    onClick={handleOpenModal2}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col xs={12}>Query 3</Col>
                <Col xs={12}>
                  {" "}
                  <Button
                    type="primary"
                    style={{ background: "green" }}
                    onClick={handleOpenModal3}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col xs={12}>Query 4</Col>
                <Col xs={12}>
                  {" "}
                  <Button
                    type="primary"
                    style={{ background: "green" }}
                    onClick={handleOpenModal4}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Divider />
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
