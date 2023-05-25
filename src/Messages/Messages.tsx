import React from 'react';
import Message from './Message';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import stylesMessages from './Dialogs.module.scss';
import { useAppSelector } from '../Redux/store';
import { selectDialogs } from '../Redux/dialogs/dialogsSlice';

const Messages = () => {
  const { dialogId} = useAppSelector(selectDialogs);
  const [message, setMessages] = React.useState([]);
  React.useEffect(() => {
    const getMess = onSnapshot(doc(db, 'dialogs', dialogId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      getMess();
    };
  }, [dialogId]);
  if (!message){
    return <div>Lets some talk</div>
  }
  return (
    <div>
      {message.map((mes, i) => <Message key={i} message={mes} />)}
    </div>
  );
};

export default Messages;
