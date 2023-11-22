import Layout from "../components/Layout"

function Unauthorized() {
  return (
    <Layout title='Access Denied'>
        <h2 className="text-xl text-orange-400 font-bold pl-12">Access  Denied</h2>
    </Layout>
  )
}

export default Unauthorized