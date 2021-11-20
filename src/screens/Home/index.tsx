import React from 'react';
import { View, Text } from 'react-native';
import { Header } from '../../components/Header';
import { styles } from './style';
import { MessageList } from '../../components/MessageList';
import { SigninBox } from '../../components/SigninBox';
import { SendMessageForm } from '../../components/SendMessageForm';
import { useAuth } from '../../hooks/auth';

function Home() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Header />
      <MessageList />
      {user ? <SendMessageForm /> : <SigninBox />}
    </View>
  );
}

export { Home };
