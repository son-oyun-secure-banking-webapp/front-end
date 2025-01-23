import {
  Row,
  Col,
  Button,
  Divider,
  Modal,
  Typography,
  Card,
  Spin,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const { Title, Paragraph } = Typography;

const Dataset1 = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState({});
  const [loading, setLoading] = useState({});
  const [queryResults, setQueryResults] = useState({});
  const [budget, setBudget] = useState(null);
  const { id: userId } = useParams();

  useEffect(() => {
    fetchBudget();
  }, []);

  const fetchBudget = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/get-user-budget-application",
        {
          params: { userId },
        }
      );
      setBudget(response.data.budgetApplication);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Error fetching budget data");
    }
  };

  const openModal = async (key) => {
    setIsModalOpen((prev) => ({ ...prev, [key]: true }));
    await fetchQueryData(key);
    fetchBudget();
  };

  const closeModal = (key) => {
    setIsModalOpen((prev) => ({ ...prev, [key]: false }));
  };

  const fetchQueryData = async (queryKey) => {
    setLoading((prev) => ({ ...prev, [queryKey]: true }));
    try {
      let response;
      if (queryKey === "query1") {
        response = await axios.get(
          "http://localhost:3001/get-count-of-applications-by-type",
          {
            params: { userId },
          }
        );
      } else if (queryKey === "query2") {
        response = await axios.get(
          "http://localhost:3001/get-count-of-applications-received-per-state",
          {
            params: { userId },
          }
        );
      } else if (queryKey === "query3") {
        response = await axios.get(
          "http://localhost:3001/get-proportion-of-applications-consummated-vs-not",
          {
            params: { userId },
          }
        );
      } else if (queryKey === "query4") {
        response = await axios.get(
          "http://localhost:3001/get-count-of-applications-received-in-2024",
          {
            params: { userId },
          }
        );
      }
      if (response) {
        setQueryResults((prev) => ({ ...prev, [queryKey]: response.data }));
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Error fetching data");
    }
    setLoading((prev) => ({ ...prev, [queryKey]: false }));
  };

  const queries = [
    {
      key: "query1",
      title: "Application Count by Type",
      description: "Displays the number of applications grouped by type.",
    },
    {
      key: "query2",
      title: "Application Count per State",
      description: "Displays the number of applications received per state.",
    },
    {
      key: "query3",
      title: "Proportion of Applications Consummated vs Not",
      description:
        "Displays the proportion of consummated (1) vs non-consummated (0) applications.",
    },
    {
      key: "query4",
      title: "Applications Received in 2024",
      description:
        "Displays the number of applications received in the year 2024.",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <Title level={3} style={{ textAlign: "center", color: "#1f2a38" }}>
          Application Dataset - Query Panel
        </Title>
        <Row gutter={[20, 20]} justify="center">
          {queries.map((query) => (
            <Col span={12} key={query.key}>
              <Card style={{ borderRadius: "8px", backgroundColor: "#ffffff" }}>
                <Title level={4}>{query.title}</Title>
                <Paragraph>{query.description}</Paragraph>
                <Button
                  type="primary"
                  style={{ background: "green" }}
                  onClick={() => openModal(query.key)}
                  disabled={budget === 0 || budget === null}
                >
                  Submit
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Divider />
        <Row justify="center">
          <Button
            type="primary"
            onClick={() => history.push(`/dashboard/${userId}`)}
          >
            Go Back
          </Button>
        </Row>
      </div>
      <Card
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          width: 250,
          backgroundColor: "#ffffff",
        }}
      >
        <Title level={5}>Remaining Budget</Title>
        <Paragraph>
          {budget !== null ? `$${budget.toFixed(2)}` : "Loading..."}
        </Paragraph>
        <Button type="primary" onClick={fetchBudget}>
          Refresh
        </Button>
      </Card>
      {queries.map((query) => (
        <Modal
          key={query.key}
          open={isModalOpen[query.key]}
          onCancel={() => closeModal(query.key)}
          footer={null}
          width={800}
        >
          <h1>{query.title} Result</h1>
          {loading[query.key] ? (
            <Spin size="large" />
          ) : queryResults[query.key] ? (
            <ul>
              {queryResults[query.key].map((item, index) => (
                <li key={index}>
                  <strong>
                    {query.key === "query1"
                      ? item.applicationType
                      : query.key === "query2"
                      ? item.state
                      : query.key === "query3"
                      ? item.consummationIndicator === 0
                        ? "Non-Consummated Applications"
                        : "Consummated Applications"
                      : query.key === "query4"
                      ? item.state
                      : "Unknown"}
                  </strong>
                  : {item.num_applications}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </Modal>
      ))}
    </div>
  );
};

export default Dataset1;
