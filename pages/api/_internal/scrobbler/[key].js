export default function handler(req, res) {
  if (req.query.key !== process.env.API_KEY)
    return res.status(401).send();

  const formData = new FormData();
  
  formData.append('files[0]', new Blob([ JSON.stringify(req.body, null, 2) ]), 'request.json');

  fetch(process.env.DC_HOOK, {
    method: 'POST',
    body: formData
  });

  /*
  switch (req.body.eventName) {
    case 'nowplaying':


      break;
    case 'scrobble':

      break;
    default:
      break;
  }
  */

  res
    .status(200)
    .send();
}