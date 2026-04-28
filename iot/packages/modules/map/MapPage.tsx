import { useQuery } from '@tanstack/react-query'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useAuth } from 'host/authStore'
import { fetchZones } from '@core/zones.api'
import Forbidden from '../Forbidden'
const icon=L.icon({iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',iconSize:[25,41],iconAnchor:[12,41]})
export default function MapPage(){
  const hasRole=useAuth((s)=>s.hasRole)
  if(!hasRole(['admin', 'iot-viewer'])) return <Forbidden />
  const { data=[] } = useQuery({queryKey:['iot','zones'],queryFn:fetchZones})
  return (
    <section className="max-w-7xl space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">IoT Map</h1>
        <p className="text-sm text-slate-500">Visualizacao das zonas monitoradas e quantidade de loggers.</p>
      </header>
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="h-[360px] sm:h-[420px] lg:h-[500px]">
          <MapContainer center={[-23.55,-46.63]} zoom={11} style={{height:'100%',width:'100%'}}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap'/>
            {data.map((z)=><Marker key={z.id} position={[z.lat,z.lng]} icon={icon}><Popup>{z.name} ({z.id}) - {z.loggerCount} loggers</Popup></Marker>)}
          </MapContainer>
        </div>
      </section>
    </section>
  )
}
