import { useEffect, useMemo, useState } from 'react'

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'
}

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, pagination: null }
  }

  if (!payload || typeof payload !== 'object') {
    return { items: [], pagination: null }
  }

  if (Array.isArray(payload.results)) {
    return {
      items: payload.results,
      pagination: {
        count: payload.count,
        next: payload.next,
        previous: payload.previous,
      },
    }
  }

  if (Array.isArray(payload.items)) {
    return {
      items: payload.items,
      pagination: null,
    }
  }

  if (Array.isArray(payload.data)) {
    return {
      items: payload.data,
      pagination: null,
    }
  }

  return { items: [], pagination: null }
}

function formatCellValue(value) {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

export default function ResourcePage({ title, endpoint }) {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const apiUrl = useMemo(() => `${getApiBaseUrl()}${endpoint}`, [endpoint])

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(apiUrl, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const normalized = normalizeResponse(payload)
        setItems(normalized.items)
        setPagination(normalized.pagination)
      } catch (caughtError) {
        if (caughtError.name !== 'AbortError') {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : 'Unable to fetch data.',
          )
          setItems([])
          setPagination(null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
    return () => controller.abort()
  }, [apiUrl])

  const columns = useMemo(() => {
    const discovered = new Set()
    for (const item of items) {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        Object.keys(item).forEach((key) => discovered.add(key))
      }
    }

    return [...discovered]
  }, [items])

  return (
    <section className="card">
      <div className="card-body">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
          <h2 className="h4 mb-0">{title}</h2>
          <small className="text-body-secondary">GET {endpoint}</small>
        </div>

        {isLoading && <p className="mb-0">Loading...</p>}

        {!isLoading && error && (
          <div className="alert alert-danger mb-0" role="alert">
            {error}
          </div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="alert alert-info mb-0" role="alert">
            No records found.
          </div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <>
            {pagination && (
              <p className="text-body-secondary mb-2">
                Total records: {pagination.count ?? items.length}
              </p>
            )}

            <div className="table-responsive">
              <table className="table table-striped table-sm align-middle mb-0">
                <thead>
                  <tr>
                    {columns.length > 0 ? (
                      columns.map((column) => <th key={column}>{column}</th>)
                    ) : (
                      <th>value</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item?.id ?? item?._id ?? index}>
                      {columns.length > 0 ? (
                        columns.map((column) => (
                          <td key={column}>{formatCellValue(item?.[column])}</td>
                        ))
                      ) : (
                        <td>{formatCellValue(item)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
