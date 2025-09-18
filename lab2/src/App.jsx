import Profile from "./components/Profile";

const App = () => {
  const users = [
    {
      id: 1,
      name: "Leanne Graham",
      role: "Software Engineer",
        avatarUrl: "https://api.dicebear.com/7.x/micah/svg?seed=Leanne"
    },
    {
      id: 2,
      name: "Ervin Howell",
      role: "Product Manager",
        avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=Ervin"
    },
    {
      id: 3,
      name: "Clementine Bauch",
      role: "UX Designer",
        avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Clementine"
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      role: "Data Scientist",
        avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=Patricia"
    },
    {
      id: 5,
      name: "Chelsey Dietrich",
      role: "DevOps Engineer",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Chelsey"
    },
    {
      id: 6,
      name: "Mrs. Dennis Schulist",
      role: "Frontend Developer",
        avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=Dennis"
    },
    {
      id: 7,
      name: "Kurtis Weissnat",
      role: "Backend Developer",
        avatarUrl: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Kurtis"
    }
    ];

    return (
      <div className="app">
        {users.map(user => (
          <Profile
            key={user.id}
            name={user.name}
            role={user.role}
            avatarUrl={user.avatarUrl}
          />
        ))}
      </div>
    );
  }

  export default App;