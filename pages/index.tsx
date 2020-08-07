import { IDevice } from "models";

export default function Home({ deviceList }: { deviceList: IDevice[] }) {
  return (
    <div>
      {deviceList?.map((m) => (
        <span key={m.codename}>{m.fullname}</span>
      ))}
    </div>
  );
}
