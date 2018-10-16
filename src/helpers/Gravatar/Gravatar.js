import MD5 from '../Hash/MD5';

const emailToGravatar = (email, imageSize = 200) => {
  const gravatarURL = 'https://www.gravatar.com/avatar/';
  const emailHash = MD5(email);
  const sizeQuery = `?s=${imageSize}`;
  return gravatarURL + emailHash + sizeQuery;
};

export default emailToGravatar;
