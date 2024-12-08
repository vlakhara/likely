import Post from "../components/common/Post";
import Profile from "../components/common/Profile";
import Wrapper from "../components/common/Wrapper";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("authUser") || "");

  return (
    <Wrapper privateRoute>
      <>
        <div className="px-[16px] pt-[16px] flex flex-col">
          <div className="header">
            <Profile
              imageUrl={user.photoURL}
              name={user.displayName}
              showGreeting
            />
          </div>
          <div className="mt-[31px]">
            <p className="text-black text-left text-[24px] font-[800] tracking-[2px]">
              Feeds
            </p>
          </div>
          <div className="mt-[19px] text-black flex flex-col gap-[10px] overflow-y-auto h-[calc(100vh-160px)] sm:h-[780px] [&::-webkit-scrollbar]:hidden">
            <Post post={{ user, postDetails: {} }} />
            <Post post={{ user, postDetails: {} }} />
            <Post post={{ user, postDetails: {} }} />
          </div>
        </div>
      </>
    </Wrapper>
  );
};

export default Dashboard;
