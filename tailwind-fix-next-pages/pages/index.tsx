// Make Home2035 your homepage
import dynamic from "next/dynamic";
const Home2035 = dynamic(() => import("./Home2035"), { ssr: true });
export default Home2035;
