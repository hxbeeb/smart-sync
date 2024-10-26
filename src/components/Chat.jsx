import React, { useState } from 'react';
import { FaUser, FaUsers, FaPhone, FaPaperPlane, FaPaperclip, FaMicrophone, FaVideo } from 'react-icons/fa';
import Sidebar from './SideBar';
import Navbar from './Navbar';

const Chat = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [chatUsers, setChatUsers] = useState([
    { id: 1, name: 'John Doe', status: 'online' },
    { id: 2, name: 'Jane Doe', status: 'offline' },
  ]);
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group 1', members: ['John Doe', 'Jane Doe'] },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, how are you?', sender: 'John Doe' },
    { id: 2, text: 'I am good, thanks', sender: 'Jane Doe' },
  ]);
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [newMember, setNewMember] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setSelectedGroup(null);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setSelectedChat(null);
  };

  const handleSendMessage = () => {
    setMessages([...messages, { id: messages.length + 1, text: message, sender: 'You' }]);
    setMessage('');
  };

  const handleCreateGroup = () => {
    setGroups([...groups, { id: groups.length + 1, name: groupName, members: groupMembers }]);
    setGroupName('');
    setGroupMembers([]);
  };

  const handleAddMember = () => {
    setGroupMembers([...groupMembers, newMember]);
    setNewMember('');
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-100 to-blue-200 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
      
        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-8">Government Communication Platform</h1>

          <div className="flex flex-wrap space-x-4">
            <div className="w-full sm:w-1/3 bg-white rounded-lg shadow-lg p-6 mb-4">
            <div className="mb-6 flex space-x-2">
  <button
    className={`flex-1 py-2 rounded-md transition duration-300 flex items-center justify-center ${activeTab === 'chats' ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    onClick={() => handleTabChange('chats')}
  >
    <FaUser className="mr-2" /> Chats
  </button>
  <button
    className={`flex-1 py-2 rounded-md transition duration-300 flex items-center justify-center ${activeTab === 'groups' ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    onClick={() => handleTabChange('groups')}
  >
    <FaUsers className="mr-2" /> Groups
  </button>
  <button
    className={`flex-1 py-2 rounded-md transition duration-300 flex items-center justify-center ${activeTab === 'calls' ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    onClick={() => handleTabChange('calls')}
  >
    <FaPhone className="mr-2" /> Calls
  </button>
</div>


              {activeTab === 'chats' && (
                <ul className="space-y-4">
                  {chatUsers.map((user) => (
                    <li
                      key={user.id}
                      className={`p-4 rounded-md cursor-pointer transition duration-300 ${selectedChat === user ? 'bg-gradient-to-r from-blue-200 to-green-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                      onClick={() => handleChatSelect(user)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                      <p className={`text-sm ${user.status === 'online' ? 'text-green-600' : 'text-gray-600'}`}>{user.status}</p>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'groups' && (
                <ul className="space-y-4">
                  {groups.map((group) => (
                    <li
                      key={group.id}
                      className={`p-4 rounded-md cursor-pointer transition duration-300 ${selectedGroup === group ? 'bg-gradient-to-r from-blue-200 to-green-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                      onClick={() => handleGroupSelect(group)}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
                      <p className="text-sm text-gray-600">{group.members.join(', ')}</p>
                    </li>
                  ))}
                </ul>
              )}

              <button
                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                onClick={() => handleTabChange('create-group')}
              >
                Create Group
              </button>
            </div>

            <div className="w-full sm:w-2/3 bg-white rounded-lg shadow-lg p-6 mb-4">
              {(selectedChat || selectedGroup) && (
                <div className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">
                    {selectedChat ? selectedChat.name : selectedGroup.name}
                  </h2>
                  <ul className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message) => (
                      <li key={message.id} className={`p-3 rounded-lg ${message.sender === 'You' ? 'bg-gradient-to-r from-blue-100 to-green-100 ml-auto' : 'bg-gray-100'} max-w-[70%]`}>
                        <h3 className="text-sm font-semibold text-gray-800">{message.sender}</h3>
                        <p className="text-gray-700">{message.text}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Type a message"
                    />
                    <button className="text-blue-600 hover:text-blue-800 transition duration-300">
                      <FaPaperclip size={20} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 transition duration-300">
                      <FaMicrophone size={20} />
                    </button>
                    <button
                      className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={handleSendMessage}
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                  <div className="mt-4 flex justify-end space-x-4">
                    <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center">
                      <FaPhone className="mr-2" /> Voice Call
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center">
                      <FaVideo className="mr-2" /> Video Call
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'create-group' && (
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">Create a New Group</h2>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2 w-full"
                    placeholder="Group Name"
                  />
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="text"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add Member"
                    />
                    <button
                      className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={handleAddMember}
                    >
                      Add
                    </button>
                  </div>
                  <button
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    onClick={handleCreateGroup}
                  >
                    Create Group
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
