export interface RegionProperties {
  adm_nm: string;    // 행정구역명 (예: "서울특별시 성북구 돈암2동")
  adm_cd2: string;   // 행정구역코드2
  sgg: string;       // 시군구코드
  sido: string;      // 시도코드
  sidonm: string;    // 시도명
  sggnm: string;     // 시군구명
  adm_cd: string;    // 행정구역코드
}

export interface RegionGeometry {
  type: "MultiPolygon";
  coordinates: number[][][][];  // 4차원 배열: [다각형셋[다각형[선[점]]]];
}

export interface RegionFeature {
  type: "Feature";
  properties: RegionProperties;
  geometry: RegionGeometry;
}

export interface RegionGeoJSON {
  type: "FeatureCollection";
  features: RegionFeature[];
}