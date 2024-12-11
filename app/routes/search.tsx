import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

interface UserData {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
}

export default function SearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchInput) return;
    const response = await fetch(`https://api.github.com/users/${searchInput}`);
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    } else {
      alert("USER_NOT_FOUND");
    }
  };

  const handleCardClick = (username: string) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter a GitHub username"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {userData && (
        <Card
          className="cursor-pointer p-4"
          onClick={() => handleCardClick(userData.login)}
        >
          <div className="flex items-center gap-4">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-lg font-bold">{userData.name || userData.login}</h2>
              <p>{userData.bio}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
