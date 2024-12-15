import moment from "moment";

interface ProfilePropsType {
  imageUrl: string;
  name: string;
  showTimestamp?: boolean;
  showGreeting?: boolean;
  isPost?: boolean;
  date?: string;
  isClickable?: boolean;
}

const Profile = (props: ProfilePropsType) => {
  const getPostedDays = () => {
    const date = props.date;
    const days = moment().diff(moment(date), "days");
    const hours = moment().diff(moment(date), "hours");
    const minutes = moment().diff(moment(date), "minutes");
    if (days === 0) {
      if (hours === 0) {
        if (minutes === 0) {
          return "Just now";
        }
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
      }
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  };

  const handleLClick = () => {
    if (props.isClickable) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className={`flex gap-[16px] items-center`} onClick={handleLClick}>
      <img
        src={props.imageUrl}
        alt="profile"
        className={`rounded-full w-[${props.isPost ? "40px" : "50px"}] h-[${
          props.isPost ? "40px" : "50px"
        }] object-cover`}
      />
      <div className="flex flex-col items-start">
        {props.showGreeting && (
          <p className="text-[#7e7e7e] font-thin text-[12px]">Welcome Back,</p>
        )}
        <p className="font-[600] text-[17px] tracking-wide">{props.name}</p>
        {props.showTimestamp && (
          <p className="text-[12px]">{getPostedDays()}</p>
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
