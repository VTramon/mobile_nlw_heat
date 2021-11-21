import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native';
import { api } from '../../services/api';
import { Message, MessageProps } from '../Message';
import { styles } from './styles';
import { io } from 'socket.io-client';

const socket = io(String(api.defaults.baseURL));

let messagesQueue: MessageProps[] = [];

socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  async function fetchMessages() {
    const messageResponse = await api.get<MessageProps[]>('messages/last3');
    setCurrentMessages(messageResponse.data);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);
        messagesQueue.shift();
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => {
        return <Message data={message} key={message.id} />;
      })}
    </ScrollView>
  );
}
