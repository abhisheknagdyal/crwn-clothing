// import "./categoires.styles.scss";
import Directory from "../../components/directory/directory.component";

const Home = ( ) => {

  const categories = [
    {
      id: 1,
      title: "Hats",
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png'
    },
    {
      id: 2,
      title: "Jacktes",
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png'
    },
    {
      id: 3,
      title: "Sneakers",
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png'
    },
    {
      id: 4,
      title: "Women'",
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
    },
    {
      id: 5,
      title: "Men",
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png'
    },
  ];

  return (
    <div>
     <Directory categories={categories} />
    </div>

  );
}

export default Home;
