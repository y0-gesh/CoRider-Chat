import React, { useEffect, useRef, useState } from 'react';
import './ChatScreen.css';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AttachItems from './AttachItems';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DotMenu from './DotMenu';

interface Chat {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

const ChatScreen: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [openAttach, setOpenAttach] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const fetchChats = async () => {
    try {
      const response = await fetch('https://qa.corider.in/assignment/chat?page=0');
      const data = await response.json();
      if (data.status === 'success') {
        setChats(data.chats);
        setDataLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  let menuRef = useRef<HTMLDivElement>(null);
  let attachRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if ((!menuRef.current?.contains(e.target as Node)) && (!attachRef.current?.contains(e.target as Node))) {
        setOpenMenu(false);
        setOpenAttach(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    if (!dataLoaded) {
      fetchChats();
    }
  }, [dataLoaded]);

  const renderChatMessages = () => {
    return chats.map((chat) => (
      <div
        key={chat.id}
        className={`message ${chat.sender.self ? 'self' : 'other'}`}
      >
        {!chat.sender.self && (
          <img
            className="profile-image"
            src={chat.sender.image}
            alt="User Profile"
          />
        )}
        <p className="message-text">{chat.message}</p>
        <span className="message-time">{formatTime(chat.time)}</span>
      </div>
    ));
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return `${time.getHours()}:${time.getMinutes()}`;
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="chat-header">
          <div className='child1'>
            <div className='two-items'>
              <ArrowBackOutlinedIcon className='back-arrow' />
              <span>Trip 1</span>
            </div>
            <EditNoteOutlinedIcon className='edit-icon' />
          </div>
          <div className='child2'>
            <div className="group1">
              <div className="grp-profile">
                <img className="grp-profile-image" src="/images/photo.png" alt="Group Profile" />
                <div className="grp-name">
                  <div className="my-add">From <b>IGI Airport, T3</b></div>
                  <div className="sender-add">To <b>Sector 28</b></div>
                </div>
              </div>
            </div>
            <div className="group2" ref={menuRef}>
              <MoreVertIcon className="dot-menu" onClick={() => setOpenMenu((prevMenu) => !prevMenu)} />
              {openMenu && <DotMenu />}
            </div>
          </div>
        </div>
        <div className="messages-container">
          {chats.length ? renderChatMessages() : 'Loading...'}
        </div>
        <div ref={attachRef}>
          <div className="input-container">
            <input className='input-message' type="text" placeholder="Type your message..." />
            <div>
              <button className='button' onClick={() => setOpenAttach((prev) => !prev)}><AttachFileIcon className="attach-icon" /></button>
            </div>
            <button className='button'><SendIcon /></button>
          </div>
          {openAttach && <AttachItems />}
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
