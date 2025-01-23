import { Layout, Menu, Card, Typography, Row, Col } from "antd";
import { useParams, useHistory } from "react-router-dom";
import {
  HomeOutlined,
  DatabaseOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import ChartImage from "./output.png";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

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
        <Content style={{ margin: "20px", backgroundColor: "#f0f2f5" }}>
          <Title level={3} style={{ marginBottom: "20px", color: "#1f2a38" }}>
            Ana Metrikler
          </Title>
          <Row gutter={[20, 20]}>
            <Col span={8}>
              <Card
                style={{
                  backgroundColor: "#ff9c6e",
                  color: "#ffffff",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => history.push(`/dataset1/${id}`)}
              >
                <Text style={{ color: "#ffffff" }}>Application Dataset</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{
                  backgroundColor: "#73d13d",
                  color: "#ffffff",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => history.push(`/dataset2/${id}`)}
              >
                <Text style={{ color: "#ffffff" }}>Default Payment Dataset</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                style={{
                  backgroundColor: "#40a9ff",
                  color: "#ffffff",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => history.push(`/dataset3/${id}`)}
              >
                <Text style={{ color: "#ffffff" }}>Bank Marketing Dataset</Text>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Card
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <img
                  src={ChartImage}
                  alt="Chart Placeholder"
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
