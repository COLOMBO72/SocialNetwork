import React from 'react';
import Message from './Message';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppSelector } from '../../Redux/store';
import { selectDialogs } from '../../Redux/dialogs/dialogsSlice';
import Preloader from '../Loading/Preloader';

const Messages = () => {
  const { dialogId } = useAppSelector(selectDialogs);
  const [message, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getMess = onSnapshot(doc(db, 'dialogs', dialogId), (doc) => {
      setLoading(true);
      doc.exists() && setMessages(doc.data().messages);
      setLoading(false);
    });
    return () => {
      getMess();
    };
  }, [dialogId]);
  if (loading) {
    return <Preloader />;
  }
  return (
    <div>
      {message.map((mes, i) => (
        <Message key={i} message={mes} />
      ))}
    </div>
  );
};

export default Messages;
