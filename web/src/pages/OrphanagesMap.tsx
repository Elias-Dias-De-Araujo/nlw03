import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FiPlus, FiArrowRight } from "react-icons/fi"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"

import "../styles/pages/orphanages-Map.css"

import mapMarkerImg from "../images/map-marker.svg"
import mapIcon from "../utils/mapIcon"
import api from "../services/api"

interface Orphanage {
  id: number
  name: string
  latitude: number
  longitude: number

}

function OrphanagesMap() {
  const [ orphanages, setOrphanages ] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get("orphanages").then(res =>{
      setOrphanages(res.data)
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        
        </header>
        <footer>
          <strong>Ceará</strong>
          <span>Iguatu</span>
        </footer>
      </aside>

      <Map
        center={[-6.3529947,-39.3102358]}
        zoom={15}
        style={{ width: "100%", height:"100%" }}
      >  
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        {orphanages.map(orphanage => {
          return (
            <Marker 
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude ,orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
                {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map> 

      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    
    </div>
  )
}

export default OrphanagesMap