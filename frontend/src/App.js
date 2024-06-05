import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";
import { MyThemeProvider } from "./components/Theme";
import MiniDrawer from "./components/Sidenav/Sidenav";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import Game from "./components/Game/Game";
import Search from "./components/Search";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const loc = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setShowAnimation(true); // Show animation when the route changes
    const timeout = setTimeout(() => {
      setShowAnimation(false); // Hide animation after 2 seconds
    }, 750);

    return () => clearTimeout(timeout);
  }, [loc]);

  const [darkMode, setDarkMode] = useState(true);

  const changeDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="App">
      <MyThemeProvider darkMode={darkMode}>
        <div
          className={`animation ${showAnimation ? "show" : ""}`}
          style={{ backgroundColor: "black" }}
        ></div>
        {showAnimation ? null : (
          <>
            {user && (
              <MiniDrawer darkMode={darkMode} changeMode={changeDarkMode} />
            )}
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
              />
              <Route
                path="/home"
                element={user ? <Home /> : <Navigate to="../auth" />}
              />
              <Route
                path="/auth"
                element={user ? <Navigate to="../home" /> : <Auth />}
              />
              <Route
                path="/game/:gameID"
                element={user ? <Game windowWidth={windowWidth} /> : <Auth />}
              />
              <Route
                path="/profile/:id"
                element={user ? <Profile /> : <Navigate to="../auth" />}
              />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />

              <Route
                path="/chat"
                element={user ? <Chat /> : <Navigate to="../auth" />}
              />

              <Route
                path="/main"
                element={
                  user ? (
                    <Main itemData={itemData} itemDataV={itemDataV} />
                  ) : (
                    <Navigate to="../auth" />
                  )
                }
              />

              <Route
                path="/search/:searchQuery"
                element={
                  user ? (
                    <Search windowWidth={windowWidth} />
                  ) : (
                    <Navigate to="../auth" />
                  )
                }
              />
            </Routes>
          </>
        )}
      </MyThemeProvider>
    </div>
  );
}

export default App;

const itemData = [
  {
    img: "/img/games/honkai.png",
    title: "Honkai Impact Star Rail",
    desc: "Honkai: Star Rail is a role-playing gacha video game developed by miHoYo, published by miHoYo in mainland China and worldwide by Cognosphere, d/b/a HoYoverse.",
    price: "$44.99",
    genre: "Open World RPG",
    rating: "4.1",
    bgColor: "#2B8DAC",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/batman.png",
    title: "Batman Arkham Knight",
    desc: "Batman: Arkham Knight is a 2015 action-adventure game developed by Rocksteady Studios and published by Warner Bros. Interactive Entertainment.",
    price: "$65.99",
    genre: "Open World RPG",
    rating: "4.9",
    bgColor: "#332D27",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/codmw3.png",
    title: "Call of Duty Modern Warfare 3",
    desc: "A sequel to 2022 Modern Warfare II, serving as the third entry in the rebooted Modern Warfare sub-series and the twentieth installment in the overall Call of Duty series.",
    price: "$69.99",
    genre: "First Person Shooter",
    rating: "4.5",
    bgColor: "#D67843",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/crew.png",
    title: "The Crew Motorfest",
    desc: "The sequel to 2018 The Crew 2 and the third game in The Crew series, and was released on September 14, 2023.",
    price: "$59.99",
    genre: "Open World Racing",
    rating: "3.8",
    bgColor: "#FE691C",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/cs2.png",
    title: "Counter Strike 2",
    desc: "Counter-Strike 2 is a 2023 multiplayer tactical first-person shooter game developed and published by Valve. It is the fifth main installment of the Counter-Strike series.",
    price: "$29.99",
    genre: "First Person Shooter",
    rating: "4.4",
    bgColor: "#E38717",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/ffxv.png",
    title: "Final Fantasy XV",
    desc: "Final Fantasy XV is an action role-playing game developed and published by Square Enix. The fifteenth main installment of the Final Fantasy series.",
    price: "$89.99",
    genre: "Open World RPG",
    rating: "4.9",
    bgColor: "#2C5870",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/ffxvi.png",
    title: "Final Fantasy XVI",
    desc: "Final Fantasy XVI is a 2023 action role-playing game developed and published by Square Enix. The sixteenth main installment in the Final Fantasy series.",
    price: "$69.99",
    genre: "Open World RPG",
    rating: "4.9",
    bgColor: "#384C5A",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/gta5.png",
    title: "Grand Theft Auto V",
    desc: "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh main entry in the Grand Theft Auto series.",
    price: "$49.99",
    genre: "Open World RPG",
    rating: "4.8",
    bgColor: "#5F8713",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/rdr2.png",
    title: "Red Dead Redemption 2",
    desc: "Red Dead Redemption 2 is a 2018 action-adventure game developed and published by Rockstar Games. The game is the third entry in the Red Dead series and a prequel to the 2010 game Red Dead Redemption.",
    price: "$59.99",
    genre: "Open World RPG",
    rating: "4.8",
    bgColor: "#C51B05",
    release: "Oct 24, 2024",
  },
];

const itemDataV = [
  {
    img: "/img/games/batman-vertical.jpg",
    title: "Batman Arkham Knight",
    desc: "Batman: Arkham Knight is a 2015 action-adventure game developed by Rocksteady Studios and published by Warner Bros. Interactive Entertainment.",
    genre: "Action",
    price: "$69.99",
    bgColor: "#332D27",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/gtav-vertical.jpg",
    title: "Grand Theft Auto V",
    desc: "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. It is the seventh main entry in the Grand Theft Auto series.",
    genre: "Open World",
    price: "$69.99",
    bgColor: "#5F8713",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/mirage-vertical.jpg",
    title: "Assassins Creed Mirage",
    desc: "Counter-Strike 2 is a 2023 multiplayer tactical first-person shooter game developed and published by Valve. It is the fifth main installment of the Counter-Strike series.",
    genre: "Stealth",
    price: "$69.99",
    bgColor: "#684424",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/nfs-vertical.jpg",
    title: "Need for Speed Heat",
    desc: "The sequel to 2018 The Crew 2 and the third game in The Crew series, and was released on September 14, 2023.",
    genre: "Racing",
    price: "$69.99",
    bgColor: "#FF2D80",
    release: "Oct 24, 2024",
  },
  {
    img: "/img/games/cod-vertical.jpg",
    title: "Call of Duty Modern Warfare 2",
    desc: "A sequel to 2022 Modern Warfare II, serving as the third entry in the rebooted Modern Warfare sub-series and the twentieth installment in the overall Call of Duty series.",
    genre: "FPS",
    price: "$69.99",
    bgColor: "#7DC92A",
    release: "Oct 24, 2024",
  },
];

const genreList = [
  "Action",
  "Adventure",
  "RPG",
  "Racing",
  "Sports",
  "First Person",
  "Battle Royale",
  "Third Person",
];
