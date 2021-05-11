import api from '../utils/api';

export function notifySubscribers(emailSubject, emailBody) {
  return api.post('/subscriber/notify-all', { emailSubject, emailBody });
}

export function addSubscriber(name, email) {
  return api.post('/subscriber', { name, email });
}
