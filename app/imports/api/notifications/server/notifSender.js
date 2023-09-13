import axios from 'axios';
import Groups from '../../groups/groups';

const sendnotif = ({ groups, title, formId, content, internalLink }) => {
  if (Meteor.settings.private.laboiteApiKey) {
    axios.defaults.baseURL = Meteor.settings.public.laboiteHost;
    axios.defaults.headers.common['X-API-KEY'] = Meteor.settings.private.laboiteApiKey;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    let link = `${Meteor.absoluteUrl()}visualizer/${formId}?autologin`;
    if (internalLink) {
      const groupSlug = Groups.findOne(groups[0]).slug; // Take the first groupId to make the link
      if (groupSlug) {
        link = `${Meteor.settings.public.laboiteHost}/groups/${groupSlug}/services/forms`;
      }
    }
    axios
      .post('/api/notifications', {
        groupsId: groups,
        content,
        title,
        link,
      })
      .then(() => console.log(`Send multi groups notif ok for form: ${formId}`))
      .catch((err) => console.log(err));
  } else {
    console.log('Warning: API key is missing in settings (can not send notifications)');
  }
};

export default sendnotif;
