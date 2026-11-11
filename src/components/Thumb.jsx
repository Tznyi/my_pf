// Small diagrams at the top of each project card.

function Chain({ items, color, strong }) {
  return (
    <div className="thumb thumb-chain">
      {items.map((it, i) => (
        <span key={it} className="chain-item">
          {i > 0 && <span className="chain-arrow" aria-hidden="true">→</span>}
          <span className={it === strong ? 'chip solid' : 'chip'} style={{ '--c': color }}>{it}</span>
        </span>
      ))}
    </div>
  )
}

export default function Thumb({ id }) {
  switch (id) {
    case 'neural-search':
      return (
        <div className="thumb thumb-tiles" aria-hidden="true">
          <span className="tile query" />
          <span className="chain-arrow">→</span>
          <span className="tile" />
          <span className="tile" />
          <span className="tile dim" />
        </div>
      )
    case 'lang-vision':
      return (
        <div className="thumb thumb-bars">
          <div><span>Before</span><i style={{ width: '66%' }} className="dim" /><b>88.0%</b></div>
          <div><span>After</span><i style={{ width: '76%' }} /><b>92.5%</b></div>
        </div>
      )
    case 'kmd-security':
      return <Chain items={['Users', 'FortiClient VPN', 'FortiGate', 'College site']} color="#F472B6" strong="FortiGate" />
    case 'mseis':
      return <Chain items={['MEMS sensor', 'I²C 50 kHz', 'Arduino', 'PAMGuard']} color="#9AA5FF" strong="PAMGuard" />
    case 'pronto':
      return (
        <div className="thumb thumb-browser" aria-hidden="true">
          <div><span /><span /><span /></div>
        </div>
      )
    case 'arch-linux':
      return (
        <div className="thumb thumb-term">
          <code><b>$</b> systemctl status</code>
          <code><b>$</b> sudo -v <em>(tested from a second TTY)</em></code>
        </div>
      )
    default:
      return null
  }
}
