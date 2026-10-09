import ResourcePage from './ResourcePage.jsx'

export default function Teams() {
  return (
    <ResourcePage title="Teams" endpoint="/api/teams/" request={fetch} />
  )
}
