import React, { FC } from 'react';

type ChatHeaderProps = {
    chatName: string
}

const ChatHeader: FC<ChatHeaderProps> = ({chatName}) => {
    return (
        <div className='border-b border-gray-400 h-16 flex items-center px-2'>
            <h1>{chatName}</h1>
        </div>
    );
};

export default ChatHeader;