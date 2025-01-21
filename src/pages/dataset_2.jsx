import {
  Row,
  Col,
  Button,
  Divider,
  Modal,
  Select,
  Typography,
  Card,
} from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const { Option } = Select;
const { Title, Paragraph } = Typography;

const Dataset2 = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState({});

  const openModal = (key) => {
    setIsModalOpen({ ...isModalOpen, [key]: true });
  };

  const closeModal = (key) => {
    setIsModalOpen({ ...isModalOpen, [key]: false });
  };

  const queries = [
    {
      key: "query1",
      title: "Query 1",
      description: "This is the description for Query 1.",
    },
    {
      key: "query2",
      title: "Query 2",
      description: "This is the description for Query 2.",
    },
    {
      key: "query3",
      title: "Query 3",
      description: "This is the description for Query 3.",
    },
    {
      key: "query4",
      title: "Query 4",
      description: "This is the description for Query 4.",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Title level={3} style={{ textAlign: "center", color: "#1f2a38" }}>
        Dataset 2 - Query Panel
      </Title>
      <Row gutter={[20, 20]} justify="center">
        {queries.map((query) => (
          <Col span={12} key={query.key}>
            <Card style={{ borderRadius: "8px", backgroundColor: "#ffffff" }}>
              <Title level={4}>{query.title}</Title>
              <Paragraph>{query.description}</Paragraph>
              <Select
                placeholder="Select an option"
                style={{ width: "100%", marginBottom: "10px" }}
              >
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
                <Option value="option3">Option 3</Option>
              </Select>
              <Button
                type="primary"
                style={{ background: "green" }}
                onClick={() => openModal(query.key)}
              >
                Submit
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider />
      <Row justify="center">
        <Button type="primary" onClick={() => history.push("/dashboard")}>
          Go Back
        </Button>
      </Row>
      {queries.map((query) => (
        <Modal
          key={query.key}
          open={isModalOpen[query.key]}
          onCancel={() => closeModal(query.key)}
        >
          <h1>{query.title} Result</h1>
        </Modal>
      ))}
    </div>
  );
};

export default Dataset2;
