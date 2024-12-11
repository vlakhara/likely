import React, { useEffect, useState } from "react";
import {
  TwitterShareButton,
  FacebookShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  InstapaperShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import TwitterIcon from "../assets/svgs/TwitterIcon";
import InstagramIcon from "../assets/svgs/InstagramIcon";
import TelegramIcon from "../assets/svgs/TelegramIcon";
import WhatsAppIcon from "../assets/svgs/WhatsAppIcon";
import FacebookIcon from "../assets/svgs/FacebookIcon";
import RedditIcon from "../assets/svgs/RedditIcon";
import MessengerIcon from "../assets/svgs/MessengerIcon";
import CloseIcon from "../assets/svgs/CloseIcon";
import CopyIcon from "../assets/svgs/CopyIcon";

interface ShareModalProps {
  postId: string;
  handleClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ postId, handleClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText("https://likely-v.vercel.app");
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  return (
    <div className="h-full w-full md:w-[500px] flex items-center justify-center absolute">
      <div className="min-h-[349px] min-w-[350px] w-[80%] py-[24px] px-[20px] bg-white rounded-[12px] z-10 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-[22px] w-[max-content] font-extrabold text-left">
            Share post
          </p>
          <span className="cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-[24px]">
          <TwitterShareButton
            url="https://likely-v.vercel.app"
            title="Likely"
            className="flex flex-col items-center justify-center h-[max-content] border "
          >
            <TwitterIcon />
            <p className="text-[12px] text-[#4F7392] text-center">Twitter</p>
          </TwitterShareButton>
          <FacebookShareButton
            url="https://likely-v.vercel.app"
            className="flex flex-col items-center justify-center h-[max-content] border "
          >
            <FacebookIcon />
            <p className="text-[12px] text-[#4F7392] text-center">Facebook</p>
          </FacebookShareButton>
          <RedditShareButton
            url="https://likely-v.vercel.app"
            title="Likely"
            className="flex flex-col items-center justify-center h-[max-content] border "
          >
            <RedditIcon />
            <p className="text-[12px] text-[#4F7392] text-center">Reddit</p>
          </RedditShareButton>
          <WhatsappShareButton
            url="https://likely-v.vercel.app"
            title="Likely"
            className="flex flex-col items-center justify-center h-[max-content] border "
          >
            <WhatsAppIcon />
            <p className="text-[12px] text-[#4F7392] text-center">WhatsApp</p>
          </WhatsappShareButton>
          <FacebookMessengerShareButton
            appId=""
            url="https://likely-v.vercel.app"
            title="Likely"
            className="flex flex-col items-center justify-center h-[max-content] border "
          >
            <MessengerIcon />
            <p className="text-[12px] text-[#4F7392] text-center">Messenger</p>
          </FacebookMessengerShareButton>
          <TelegramShareButton
            url="https://likely-v.vercel.app"
            title="Likely"
            className="flex flex-col items-center justify-center h-[max-content] border "
          >
            <TelegramIcon />
            <p className="text-[12px] text-[#4F7392] text-center">Telegram</p>
          </TelegramShareButton>
          <InstapaperShareButton
            url="https://likely-v.vercel.app"
            title="Likely"
            className="flex flex-col items-center justify-center h-[max-content] border "
          >
            <InstagramIcon />
            <p className="text-[12px] text-[#4F7392] text-center">Instagram</p>
          </InstapaperShareButton>
        </div>
        <p className="text-[16px] w-[max-content] font-[400] text-left mt-[26px]">
          Page Link
        </p>
        <div className="h-[50px] rounded-[8px] flex items-center justify-between px-[13px] bg-gray-100 text-[##626262] mt-[8px]">
          <p className="text-gray-400">https://likely-v.vercel.app</p>
          <span onClick={handleCopy}>
            <span
              style={{
                display: copied ? "none" : "block",
                transition: "all 0.3s ease",
              }}
            >
              <CopyIcon />
            </span>
            <p
              className="text-gray-400 text-[12px]"
              style={{
                display: copied ? "block" : "none",
                transition: "all 0.3s ease",
              }}
            >
              Copied
            </p>
          </span>
        </div>
      </div>
      <div
        className="h-full w-full bg-gray-500 absolute opacity-[0.5] z-0"
        style={{ content: "" }}
        onClick={() => {
          handleClose();
        }}
      ></div>
    </div>
  );
};

export default ShareModal;
