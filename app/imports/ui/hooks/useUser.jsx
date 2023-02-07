import { useState } from 'react';
import { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

export default function useUser() {
  const [currentUser, setCurrentUser] = useState(null);

  const isLoading = useTracker(() => {
    userHandle = Meteor.subscribe('userData');
    return !userHandle.ready();
  });

  const user = useTracker(() => {
    return Meteor.user();
  });

  useEffect(() => {
    setCurrentUser(user);
  }, [isLoading]);

  return [currentUser];
}
