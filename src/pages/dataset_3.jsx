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
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const { Title, Paragraph } = Typography;

const Dataset3 = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState({});
  const [loading, setLoading] = useState({});
  const [queryResults, setQueryResults] = useState({});
  const { id: userId } = useParams();

  const openModal = async (key) => {
    setIsModalOpen((prev) => ({ ...prev, [key]: true }));
    fetchQueryData(key);
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
          "http://localhost:3001/get-number-of-customers-with-housing-loans-by-education-level",
          {
            params: { userId },
          }
        );
      } else if (queryKey === "query2") {
        response = await axios.get(
          "http://localhost:3001/get-number-of-customers-contacted-each-month",
          {
            params: { userId },
          }
        );
      } else if (queryKey === "query3") {
        response = await axios.get(
          "http://localhost:3001/get-number-of-customers-accepted-offer-by-marital-status",
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
      title: "Customers with Housing Loans by Education Level",
      description:
        "Shows the number of customers who have taken housing loans, categorized by education level.",
    },
    {
      key: "query2",
      title: "Number of Customers Contacted Each Month",
      description:
        "Displays the total number of customers contacted per month as part of a marketing campaign.",
    },
    {
      key: "query3",
      title: "Accepted Offers by Marital Status",
      description:
        "Shows how many customers accepted the bank's offer, grouped by marital status (Single, Married, etc.).",
    },
  ];
  console.log(queryResults);

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
          Bank Marketing Dataset - Query Panel
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
                      ? `Education Level ${item.education}`
                      : query.key === "query2"
                      ? `Month: ${item.month}`
                      : query.key === "query3"
                      ? `${item.marital}`
                      : "Unknown"}
                  </strong>
                  :{" "}
                  {item.num_customers || item.num_contacts || item.num_accepted}
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

export default Dataset3;
