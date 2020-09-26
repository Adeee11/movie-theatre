import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { AvailableShows } from "../components/AvailabeShowsTable/AvailableShowsTable"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Available Shows</h1>
    <AvailableShows />
  </Layout>
)

export default IndexPage
