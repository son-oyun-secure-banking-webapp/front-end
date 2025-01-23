import { Layout, Menu, Card, Typography, Row, Col, Tooltip } from "antd";
import { useParams, useHistory } from "react-router-dom";
import {
  HomeOutlined,
  DatabaseOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  DollarOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log("User ID from URL:", id);

  const menuItems = [
    { key: "home", icon: <HomeOutlined />, label: "Home" },
    { key: "dataset", icon: <DatabaseOutlined />, label: "Datasets" },
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
  ];

  const datasetButtons = [
    {
      key: "dataset1",
      title: "Application Dataset",
      description: "Manage and analyze application data.",
      color: "#ff9c6e",
      icon: <AppstoreOutlined style={{ fontSize: "24px", color: "#ffffff" }} />,
      route: `/dataset1/${id}`,
    },
    {
      key: "dataset2",
      title: "Default Payment Dataset",
      description: "Analyze default payment data.",
      color: "#73d13d",
      icon: <DollarOutlined style={{ fontSize: "24px", color: "#ffffff" }} />,
      route: `/dataset2/${id}`,
    },
    {
      key: "dataset3",
      title: "Bank Marketing Dataset",
      description: "Explore bank marketing data.",
      color: "#40a9ff",
      icon: <BankOutlined style={{ fontSize: "24px", color: "#ffffff" }} />,
      route: `/dataset3/${id}`,
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={{ backgroundColor: "#1f2a38" }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div
          style={{
            height: "64px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "18px",
            paddingLeft: "16px",
          }}
        >
          Secure Banking Research App
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          style={{ backgroundColor: "#1f2a38" }}
          onClick={({ key }) => {
            if (key === "logout") {
              console.log("Logout clicked");
            } else if (key === "home") {
              history.push(`/dashboard/${id}`);
            } else if (key === "profile") {
              history.push(`/profile/${id}`);
            }
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "#ffffff",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Title level={4} style={{ margin: 0, color: "#1f2a38" }}>
            Merhaba, İrem
          </Title>
          <input
            type="text"
            placeholder="Search"
            style={{
              padding: "8px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              width: "200px",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "20px",
            backgroundColor: "#f0f2f5",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Title
            level={3}
            style={{
              marginBottom: "20px",
              color: "#1f2a38",
              textAlign: "center",
            }}
          >
            Key Metrics, Please Select a Dataset
          </Title>
          <Row gutter={[20, 20]} justify="center">
            {datasetButtons.map((button) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                key={button.key}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Tooltip title={button.description}>
                  <Card
                    style={{
                      backgroundColor: button.color,
                      color: "#ffffff",
                      borderRadius: "8px",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "100%",
                      maxWidth: "300px",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                    onClick={() => history.push(button.route)}
                    hoverable
                    bodyStyle={{ padding: "20px" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>{button.icon}</div>
                    <Title level={4} style={{ color: "#ffffff" }}>
                      {button.title}
                    </Title>
                  </Card>
                </Tooltip>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
