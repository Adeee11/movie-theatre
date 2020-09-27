import { Button, Input, Layout, Select, Table } from "antd"
import React from "react"
import { Helmet } from "react-helmet"
import SEO from "../components/seo"

const { Header, Content } = Layout
const { Option } = Select
function IndexPage() {
  const dataSource = [
    {
      key: "1",

      movie: "Ready Player One",
      show: "3:30px",
      language: "English",
      tickets: 10,
    },
    {
      key: "2",
      show: "5:00pm",
      movie: "Fantastic Four",
      tickets: 9,
      language: "English",
    },
  ]

  const columns = [
    {
      title: "Movie Name",
      dataIndex: "movie",
      key: "movie",
    },

    {
      title: "Show Time",
      dataIndex: "show",
      key: "show",
    },
    {
      title: "AvailableTickets",
      dataIndex: "tickets",
      key: "tickets",
    },
    { title: "Language", dataIndex: "language", key: "language" },
  ]

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SEO title="Moview Theatre" />
      <Helmet>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        />
      </Helmet>
      <Layout className="site-layout">
        <Header style={{background: "#001529"}}  className="site-layout-background d-flex align-items-center">
          <h3 className="text-white">Movie Theatre</h3>
        </Header>
        <Content>
          <div className="container mt-3">
            <div className="row">
              <div className="col-12">
                <Table columns={columns} dataSource={dataSource}></Table>
              </div>
            </div>
            <div className="row py-4 bg-white">
              <div className="col-md-3">
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Pick a Movie"
                  aria-autocomplete="none"
                  optionFilterProp="children"
                >
                  <Option value="jack">Day Shift</Option>
                  <Option value="lucy">Night Shift</Option>
                </Select>
                <Input className="mt-3" placeholder="Viewer Name" />
              </div>
              <div className="col-md-3">
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Pick a Show"
                  aria-autocomplete="none"
                  optionFilterProp="children"
                >
                  <Option value="jack">Day Shift</Option>
                  <Option value="lucy">Night Shift</Option>
                </Select>
                <Input className="mt-3" placeholder="Contact" />
              </div>
              <div className="col-md-3">
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Select a Shift"
                  aria-autocomplete="none"
                  optionFilterProp="children"
                >
                  <Option value="jack">Day Shift</Option>
                  <Option value="lucy">Night Shift</Option>
                </Select>
              </div>
              <div className="col-md-3">
                <Button className="w-100" type="primary">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default IndexPage
