import { ReactNode, type FC } from "react";
import { Typography, Layout, theme } from "antd";
const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: ReactNode
}

const { Title } = Typography;

const MainLayout = ({children}: MainLayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{minHeight: '100vh'}} className="full">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: '#fff',
          boxShadow: '2px 4px 5px rgba(0,0,0,.1)'
        }}
      >
        <div className="demo-logo" />
        <Title level={3}>Upload File</Title>
        {/* <Menu
          // theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        /> */}
      </Header>
      <Content className="site-layout" style={{ margin: '1rem', marginBottom: '5rem',padding: "0 50px", width:'100%', height:"70%", display:'flex', alignItems:'center' }}>
        <div
          style={{ padding: 24, height: '100%', width:'100%', background: colorBgContainer }}
        >
          {children}
        </div>
      </Content>
      {/* {children} */}
      {/* <Footer style={{ position:'absolute', bottom: '0rem', left: '0', right: 0, textAlign: "center" }}>
        Design & Develop by Hanibal G, 2023
      </Footer> */}
    </Layout>
  );
};

export default MainLayout;
