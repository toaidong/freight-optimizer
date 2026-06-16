import { useState } from 'react'
import TruckViewer from './components/TruckViewer'

function App() {
  const [packedItems, setPackedItems] = useState([])
  const [truck, setTruck] = useState({ name: 'semi', width: 53, height: 9, depth: 8, max_weight: 100000 })
  const [items, setItems] = useState([{ width: '', height: '', depth: '', weight: '' }])

  const addItem = () => {
    setItems([...items, { width: '', height: '', depth: '', weight: '' }])
  }

  const updateItem = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = value
    setItems(updated)
  }

  const handlePack = async () => {
    const response = await fetch('http://127.0.0.1:5000/pack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ truck, items })
    })
    const data = await response.json()
    setPackedItems(data.packed_items)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Panel */}
      <div style={{ width: '300px', padding: '20px', overflowY: 'auto', background: '#1a1a1a', color: 'white' }}>
        <h2>Freight Optimizer</h2>

        <h3>Truck</h3>
        <select onChange={(e) => {
          if (e.target.value === 'semi') setTruck({ name: 'semi', width: 53, height: 9, depth: 8, max_weight: 100000 })
          else setTruck({ name: 'box', width: 24, height: 8, depth: 7, max_weight: 26000 })
        }}>
          <option value="semi">Semi-Trailer</option>
          <option value="box">Box Truck</option>
        </select>

        <h3>Cargo Items</h3>
        {items.map((item, i) => (
          <div key={i} style={{ marginBottom: '10px', padding: '10px', background: '#2a2a2a', borderRadius: '6px' }}>
            <p style={{ margin: '0 0 6px' }}>Item {i + 1}</p>
            {['width', 'height', 'depth', 'weight'].map(field => (
              <input
                key={field}
                type="number"
                placeholder={field}
                value={item[field]}
                onChange={(e) => updateItem(i, field, parseFloat(e.target.value))}
                style={{ display: 'block', width: '100%', marginBottom: '4px', padding: '4px', boxSizing: 'border-box' }}
              />
            ))}
          </div>
        ))}

        <button onClick={addItem} style={{ width: '100%', marginBottom: '8px', padding: '8px' }}>
          + Add Item
        </button>
        <button onClick={handlePack} style={{ width: '100%', padding: '8px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Pack Cargo
        </button>
      </div>

      {/* Right Panel - 3D View */}
      <div style={{ flex: 1 }}>
        <TruckViewer packedItems={packedItems} truck={truck} />
      </div>
    </div>
  )
}

export default App