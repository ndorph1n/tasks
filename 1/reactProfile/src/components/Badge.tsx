import type { BadgeProps } from "../types/types";

export default function Badge({ info }: BadgeProps) {
  return (
    <ul>
      <li>Id : {info.id}</li>
      <li>Name: {info.name}</li>
      <li>Username: {info.username}</li>
      <li>Email: {info.email}</li>
      <li>
        Address:
        <ul>
          <li>Street: {info.address.street}</li>
          <li>Suite: {info.address.suite}</li>
          <li>City: {info.address.city}</li>
          <li>Zipcode: {info.address.zipcode}</li>
          <li>
            Geo:
            <ul>
              <li>Lat: {info.address.geo.lat}</li>
              <li>Lng: {info.address.geo.lng}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Phone: {info.phone}</li>
      <li>Website: {info.website}</li>
      <li>
        Company:
        <ul>
          <li>Name: {info.company.name}</li>
          <li>Cath Phrase: {info.company.catchPhrase}</li>
          <li>Bs: {info.company.bs}</li>
        </ul>
      </li>
    </ul>
  );
}
