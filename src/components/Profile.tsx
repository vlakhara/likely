import React from "react";

interface ProfileCardProps {}

const ProfileCard: React.FC<ProfileCardProps> = () => {
  const user = JSON.parse(
    localStorage.getItem("authUser") || JSON.stringify({})
  );
  return (
    <div>
      <div className="h-[200px] bg-red-300 relative">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-24 h-24 rounded-full absolute bottom-[-50px] left-3 bg-white object-cover border-4 border-white shadow-lg"
        />
      </div>
      <div className="text-right mt-4 px-5">
        <button
          // onClick={onEditProfile}
          className="px-4 py-2 border border-black text-black rounded-full transition w-[260px]"
        >
          Edit Profile
        </button>
      </div>

      <div className="text-left px-5 mt-[20px]">
        <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
        <p className="text-sm text-gray-500 mt-2">{user?.bio}</p>
      </div>

      {/* Posts Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold border text-left px-5">
          My Posts
        </h3>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {/* {posts.map((post, index) => (
            <div key={index} className="relative">
              <img
                src={post}
                alt={`post-${index}`}
                className="rounded-lg w-full object-cover h-60 shadow-md"
              />
              <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-lg text-xs text-black font-semibold">
                {index + 1}/{posts.length}
              </div>
              <div className="absolute bottom-2 left-2 text-white text-lg font-semibold">
                <span>❤️</span> 67
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
