import "../css/home.css";
import Transition from "../components/Transition";
import { NavLink } from "react-router-dom";
import ArtStyle from "./ArtStyle";
// import Header from "./Header";
import Footer from "./Footer";
// import {handleLogout} from "../App"
<style>
  @import
  {/* url('https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Asimovian&family=Caprasimo&family=Cedarville+Cursive&family=Edu+NSW+ACT+Cursive:wght@400..700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Istok+Web:ital,wght@0,400;0,700;1,400;1,700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=National+Park:wght@200..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Outfit:wght@100..900&family=Paprika&family=Permanent+Marker&family=Sahitya:wght@400;700&display=swap'); */}
</style>;

function Home() {
  // const handleLogout = () => {
  //   console.log("Logged Out");
  // };

  return (
    <Transition>
      {/* <Header onLogout={handleLogout} /> */}
      <div className="home">
        <div className="home-content">
          <div className="heading">
            {/* <h3>THIS IS</h3> */}

            <h1>संस्कृति </h1>
            <h1>सेतु</h1>
          </div>

          <NavLink to={"/register"}>
            <button className="explore-btn">Explore</button>
          </NavLink>
        </div>
        <div className="green-div"></div>
        <div className=""></div>
      </div>
      <section>
        <ArtStyle />
      </section>
      <Footer />
    </Transition>
  );
}
export default Home;
