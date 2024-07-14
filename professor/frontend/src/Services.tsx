import React from "react";

interface productProps {
  id?: string;
  name?: string;
}
interface userProps extends productProps {
  userName: string;
  email: string;
}

const users: userProps[] = [
  { userName: "User1", email: "user1@example.com" },
  { userName: "User2", email: "user2@example.com" },
  { userName: "User3", email: "user3@example.com" },
];
const Services: React.FC<userProps> = (p: userProps) => {
  const [user, setUser] = React.useState<userProps>({
    userName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div>
      <h2>Form Submission Example</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Services;
