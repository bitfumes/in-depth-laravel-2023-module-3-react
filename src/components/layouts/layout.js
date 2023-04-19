import Header from "./header";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <div className="container m-auto">
        <Header />
        <div className="my-10">{children}</div>
      </div>
    </div>
  );
}
