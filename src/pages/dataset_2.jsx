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

const Dataset2 = () => {
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
          "http://localhost:3001/get-count-defaulters-by-education-level",
          {
            params: { userId },
          }
        );
      } else if (queryKey === "query2") {
        response = await axios.get(
          "http://localhost:3001/get-count-of-customers-with-payment-delays-last-six-month",
          {
            params: { userId },
          }
        );
      } else if (queryKey === "query3") {
        response = await axios.get(
          "http://localhost:3001/get-count-of-customers-by-gender",
          {
            params: { userId },
          }
        );
      } else if (queryKey === "query4") {
        response = await axios.get(
          "http://localhost:3001/get-count-of-customers-by-age-group",
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
      title: "Defaulters Count by Education Level",
      description:
        "Displays the number of defaulters grouped by education level.",
    },
    {
      key: "query2",
      title: "Customers with Payment Delays in Last 6 Months",
      description:
        "Shows the number of customers who experienced payment delays over the past six months, categorized by education level. This metric reflects how late payments are distributed across different education levels.",
    },
    {
      key: "query3",
      title: "Customer Count by Gender",
      description:
        "Displays the number of customers grouped by gender. Gender values: 1 = Male, 2 = Female.",
    },
    {
      key: "query4",
      title: "Customer Count by Age Group",
      description:
        "Displays the number of customers grouped by age. The age groups are categorized into different brackets for better analysis.",
    },
  ];
console.log(queryResults)
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
          Default Payment Dataset - Query Panel
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
                    {query.key === "query1" || query.key === "query2"
                      ? `Education Level ${item.education} (${
                          item.education === 1
                            ? "Graduate School"
                            : item.education === 2
                            ? "University"
                            : item.education === 3
                            ? "High School"
                            : item.education === 4
                            ? "Others"
                            : item.education === 5
                            ? "Unknown"
                            : item.education === 6
                            ? "Elementary School"
                            : "N/A"
                        })`
                      : query.key === "query3"
                      ? item.sex === 1
                        ? "Male"
                        : "Female"
                      : query.key === "query4"
                      ? `Age Group: ${item.age_group}`
                      : "Unknown"}
                  </strong>
                  :{" "}
                  {item.num_defaulters ||
                    item.num_delayed_customers ||
                    item.num_customers}
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

export default Dataset2;
