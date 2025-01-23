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

const Dataset2 = () => {
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
        "http://localhost:3001/get-user-budget-default-payment",
        {
          params: { userId },
        }
      );
      setBudget(response.data.budgetDefaultPayment);
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

  const educationLevel = (education) => {
    return education === 1
      ? "Graduate School"
      : education === 2
      ? "University"
      : education === 3
      ? "High School"
      : "Others";
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

  const ageGroupLabel = (age) => {
    return age === 20
      ? "20-30"
      : age === 30
      ? "30-40"
      : age === 40
      ? "40-50"
      : age === 50
      ? "50-60"
      : age === 60
      ? "60-70"
      : "70-∞";
  };

  // Fonksiyon: "Others" kategorisini toplamak
  const aggregateOthers = (data, key) => {
    if (key === "query1" || key === "query2") {

    const aggregatedData = [];
    let othersTotal = 0;

    data.forEach((item) => {
      if (educationLevel(item.education) === "Others" || item.education === null) {
        othersTotal += item.num_defaulters;
      } else {
        aggregatedData.push(item);
      }
    });

    if (othersTotal > 0) {
      aggregatedData.push({
        education: "Others",
        num_defaulters: othersTotal,
      });
    }

    return aggregatedData;
  }
  return data;
  };

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
              <Card
                style={{
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                }}
              >
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
              {aggregateOthers(queryResults[query.key], query.key).map(
                (item, index) => (
                  <li key={index}>
                    <strong>
                      {query.key === "query1" || query.key === "query2"
                        ? educationLevel(item.education)
                        : query.key === "query3"
                        ? item.sex === 1
                          ? "Male"
                          : "Female"
                        : query.key === "query4"
                        ? `Age Group: ${ageGroupLabel(item.age_group)}`
                        : "Unknown"}
                    </strong>
                    :{" "}
                    {item.num_defaulters ||
                      item.num_delayed_customers ||
                      item.num_customers}
                  </li>
                )
              )}
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
