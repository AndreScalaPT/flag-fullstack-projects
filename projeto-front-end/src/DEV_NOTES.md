AddressMap.jsx

🗺 Objetivo

Implementar um mapa interativo com Mapbox GL JS, carregado dinamicamente com coordenadas do ficheiro JSON de histórico, com marcadores, linha do trajeto e animação flyTo ao selecionar uma morada.

📦 Bibliotecas usadas

mapbox-gl Renderização do mapa 3D/2D + API de camadas e markers
useEffect Inicialização do mapa e atualização quando o foco muda
useRef Guarda instância do mapa para não re-renderizar
history.json Base de dados para moradas e coordenadas

🔹 1. Importações do componente
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import historyData from "../data/history.json";

📝 O que isto faz:

useRef() guarda a instância do mapa fora do fluxo React

mapbox-gl é a engine do mapa

O CSS externo é obrigatório para desenho e interações

O JSON fornece dados de marcadores e linha

📘 Documentação consultada → https://docs.mapbox.com/mapbox-gl-js/guides/install/

🔹 2. Token Mapbox
mapboxgl.accessToken = "pk.XXXXXX";

📝 Autentica a aplicação para poder carregar tiles, markers, layers.
Sem isto o mapa NÃO abre.

📘 Docs Token → https://docs.mapbox.com/help/getting-started/access-tokens/

🔹 3. Inicialização do mapa (useEffect #1)
useEffect(() => {
mapInstance.current = new mapboxgl.Map({
container: mapContainer.current,
style: "mapbox://styles/mapbox/streets-v12",
center: [moradas[0].lng, moradas[0].lat],
zoom: 16,
pitch: 45,
bearing: -10,
antialias: true,
});

return () => mapInstance.current?.remove();
}, [moradas]);

📝 Explicação fácil:

Linha Significado
new mapboxgl.Map() Cria o mapa dentro do componente
container Local onde o mapa vai ser renderizado
center Centraliza na primeira morada do JSON
zoom/pitch/bearing Ângulo + profundidade → aspecto moderno
cleanup remove() Para não criar 2 mapas ao re-renderizar

📘 Documentação → https://docs.mapbox.com/mapbox-gl-js/api/map/

🔹 4. Adição da Linha + Marcadores (useEffect #2)
map.addSource("trajeto", {
type: "geojson",
data:{ type:"Feature", geometry:{ type:"LineString", coordinates: [...] }}
});

map.addLayer({ id:"trajeto-linha", type:"line", source:"trajeto" });

📝 Interpretação:

✔ Cria uma linha ligando todas as moradas (como percurso histórico)
✔ addLayer desenha visualmente esta linha no mapa
✔ GeoJSON permite futuras expansões fáceis

📘 Doc Sources → https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/

new mapboxgl.Marker(el)
.setLngLat([m.lng,m.lat])
.setPopup(new mapboxgl.Popup().setHTML(...))
.addTo(mapInstance.current);

📝 Interpretação:

✔ Cria marcador visual
✔ Cada ponto abre popup com nome + período + link Maps
✔ Aceita imagens personalizadas

📘 Doc Marker → https://docs.mapbox.com/mapbox-gl-js/api/markers/

🔹 5. Mudança de foco com animação (useEffect #3)
useEffect(() => {
if (!mapInstance.current) return;
const m = moradas[focusIndex];
mapInstance.current.flyTo({
center:[m.lng,m.lat],
zoom:18,
duration:1200,
});
},[focusIndex]);

📝 Quando o utilizador muda de morada:

Resultado Descrição
Mapa move-se sozinho flyTo() anima coordenadas + zoom
UX agradável Funciona como um tour guiado
Nada é re-renderizado useRef mantém instância viva

📘 Doc FlyTo → https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto
