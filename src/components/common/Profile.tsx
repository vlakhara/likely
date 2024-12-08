import moment from "moment";

interface ProfilePropsType {
  imageUrl: string;
  name: string;
  showTimestamp?: boolean;
  showGreeting?: boolean;
  isPost?: boolean;
}

const Profile = (props: ProfilePropsType) => {
  return (
    <div className={`flex gap-[16px] items-center`}>
      <img
        src={props.imageUrl}
        alt="profile"
        className={`rounded-full w-[${props.isPost ? "40px" : "50px"}] h-[${
          props.isPost ? "40px" : "50px"
        }] object-cover`}
      />
      <div className="flex flex-col items-start">
        {props.showGreeting && (
          <p className="text-[#ABABAB] font-thin text-[12px]">Welcome Back,</p>
        )}
        <p className="text-black font-[600] text-[17px] tracking-wide">
          {props.name}
        </p>
        {props.showTimestamp && (
          <p className="text-[12px]">
            {moment(new Date().toLocaleDateString()).format("Do MMMM, YYYY")}
          </p>
        )}
      </div>
    </div>
  );
};

Profile.defaultProps = {
  showTimestamp: false,
  showGreeting: false,
};

export default Profile;
