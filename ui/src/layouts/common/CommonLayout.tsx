import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

export default function CommonLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
