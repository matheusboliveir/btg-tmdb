export interface GeoInfo {
  ip: string;
  success: boolean;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string;
  calling_code: string;
  capital: string;
  borders: string;
  flag: GeoFlag;
  connection: GeoConnection;
  timezone: GeoTimezone;
}

export interface GeoConnection {
  asn: number;
  org: string;
  isp: string;
  domain: string;
}

export interface GeoFlag {
  img: string;
  emoji: string;
  emoji_unicode: string;
}
export interface GeoTimezone {
  id: string;
  abbr: string;
  is_dst: boolean;
  offset: number;
  utc: string;
  current_time: string;
}
